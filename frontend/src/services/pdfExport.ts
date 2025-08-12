/* eslint-disable @typescript-eslint/no-explicit-any */
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { type BackendItineraryResponse } from "../data/itineraryInterface";

export interface ExportOptions {
  filename?: string;
  format?: "a4" | "letter";
  orientation?: "portrait" | "landscape";
  quality?: number;
}

export const exportItineraryToPDF = async (
  itineraryData: BackendItineraryResponse,
  options: ExportOptions = {}
): Promise<void> => {
  const destination = itineraryData?.tripDetails?.destination || "viagem";
  const safeDestination =
    destination
      .toLowerCase()
      .replace(/[^a-z0-9\s]/gi, "")
      .replace(/\s+/g, "-") || "roteiro";

  const {
    filename = `roteiro-${safeDestination}.pdf`,
    format = "a4",
    orientation = "portrait",
    quality = 0.95,
  } = options;

  try {
    // Create a temporary container for PDF content
    const tempContainer = document.createElement("div");
    tempContainer.style.position = "absolute";
    tempContainer.style.left = "-9999px";
    tempContainer.style.top = "0";
    tempContainer.style.width = "210mm"; // A4 width
    tempContainer.style.backgroundColor = "white";
    tempContainer.style.padding = "20mm";
    tempContainer.style.fontFamily = "Arial, sans-serif";
    tempContainer.style.fontSize = "12px";
    tempContainer.style.lineHeight = "1.6";
    tempContainer.style.color = "#333";

    tempContainer.innerHTML = generatePDFContent(itineraryData);

    document.body.appendChild(tempContainer);

    const canvas = await html2canvas(tempContainer, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#ffffff",
      width: tempContainer.scrollWidth,
      height: tempContainer.scrollHeight,
    });

    document.body.removeChild(tempContainer);

    const pdf = new jsPDF({
      orientation,
      unit: "mm",
      format,
    });

    const imgWidth = format === "a4" ? 210 : 216; // A4 or Letter width in mm
    const pageHeight = format === "a4" ? 297 : 279; // A4 or Letter height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    // Add first page
    pdf.addImage(
      canvas.toDataURL("image/jpeg", quality),
      "JPEG",
      0,
      position,
      imgWidth,
      imgHeight
    );
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(
        canvas.toDataURL("image/jpeg", quality),
        "JPEG",
        0,
        position,
        imgWidth,
        imgHeight
      );
      heightLeft -= pageHeight;
    }

    // Save the PDF
    pdf.save(filename);
  } catch (error) {
    console.error("Erro ao exportar PDF:", error);
    throw new Error("Falha ao gerar o PDF. Tente novamente.");
  }
};

const generatePDFContent = (
  itineraryData: BackendItineraryResponse
): string => {
  const { itinerary } = itineraryData || {};
  if (!itinerary) {
    throw new Error("Dados do itinerário não encontrados");
  }
  const currentDate = new Date().toLocaleDateString("pt-BR");

  return `
    <div style="max-width: 100%; margin: 0 auto;">
      <!-- Header -->
      <div style="text-align: center; margin-bottom: 30px; border-bottom: 3px solid #3B82F6; padding-bottom: 20px;">
        <h1 style="color: #1E40AF; margin: 0; font-size: 28px; font-weight: bold;">
          🌟 TripWise - Roteiro de Viagem
        </h1>
        <h2 style="color: #3B82F6; margin: 10px 0 0 0; font-size: 22px;">
          ${itineraryData.tripDetails?.destination || "Destino não informado"}
        </h2>
        <p style="color: #6B7280; margin: 10px 0 0 0; font-size: 14px;">
          Gerado em ${currentDate} | Duração: ${itineraryData.tripDetails?.duration || "Não informado"} dias
        </p>
      </div>

      <!-- Overview -->
      <div style="margin-bottom: 25px;">
        <h3 style="color: #1F2937; margin: 0 0 15px 0; font-size: 18px; border-left: 4px solid #3B82F6; padding-left: 12px;">
          📋 Resumo da Viagem
        </h3>
        <div style="background-color: #F8FAFC; padding: 15px; border-radius: 8px; border: 1px solid #E2E8F0;">
          <p style="margin: 0; color: #374151;"><strong>Destino:</strong> ${
            itineraryData.tripDetails?.destination || "Não informado"
          }</p>
          <p style="margin: 8px 0 0 0; color: #374151;"><strong>Duração:</strong> ${
            itineraryData.tripDetails?.duration || "Não informado"
          } dias</p>
          <p style="margin: 8px 0 0 0; color: #374151;"><strong>Tipo de Viagem:</strong> ${
            itineraryData.tripDetails?.tripType || "Não informado"
          }</p>
          <p style="margin: 8px 0 0 0; color: #374151;"><strong>Orçamento:</strong> ${
            itineraryData.preferences?.budget || "Não informado"
          }</p>
          ${
            itinerary.resumoExecutivo
              ? `<p style="margin: 8px 0 0 0; color: #374151;"><strong>Resumo:</strong> ${itinerary.resumoExecutivo}</p>`
              : ""
          }
        </div>
      </div>

      <!-- Daily Itinerary -->
      ${
        itinerary.itinerarioDiario
          ? generateDailyItineraryHTML(itinerary.itinerarioDiario)
          : ""
      }

      <!-- Accommodations -->
      ${
        itinerary.recomendacoesHospedagem
          ? generateAccommodationsHTML(itinerary.recomendacoesHospedagem)
          : ""
      }

      <!-- Budget -->
      ${
        itinerary.orcamentoDetalhado
          ? generateBudgetHTML(itinerary.orcamentoDetalhado)
          : ""
      }

      <!-- Unique Experiences -->
      ${
        itinerary.experienciasUnicas
          ? generateExperiencesHTML(itinerary.experienciasUnicas)
          : ""
      }

      <!-- Hidden Gems -->
      ${
        itinerary.joiasEscondidas
          ? generateHiddenGemsHTML(itinerary.joiasEscondidas)
          : ""
      }

      <!-- Expert Tips -->
      ${
        itinerary.dicasEspecialistas
          ? generateExpertTipsHTML(itinerary.dicasEspecialistas)
          : ""
      }

      <!-- Special Considerations -->
      ${
        itinerary.consideracoesEspeciais
          ? generateSpecialConsiderationsHTML(itinerary.consideracoesEspeciais)
          : ""
      }

      <!-- Footer -->
      <div style="margin-top: 40px; text-align: center; border-top: 2px solid #E5E7EB; padding-top: 20px;">
        <p style="color: #6B7280; margin: 0; font-size: 12px;">
          Roteiro gerado por TripWise • Sua experiência de viagem personalizada
        </p>
        <p style="color: #9CA3AF; margin: 5px 0 0 0; font-size: 11px;">
          Data de geração: ${currentDate}
        </p>
      </div>
    </div>
  `;
};

const generateDailyItineraryHTML = (itinerarioDiario: any[]): string => {
  if (!itinerarioDiario || itinerarioDiario.length === 0) return "";

  return `
    <div style="margin-bottom: 25px;">
      <h3 style="color: #1F2937; margin: 0 0 15px 0; font-size: 18px; border-left: 4px solid #10B981; padding-left: 12px;">
        📅 Itinerário Diário
      </h3>
      ${itinerarioDiario
        .map(
          (day, index) => `
        <div style="margin-bottom: 20px; background-color: #F9FAFB; padding: 15px; border-radius: 8px; border: 1px solid #E5E7EB;">
          <h4 style="color: #059669; margin: 0 0 10px 0; font-size: 16px;">
            Dia ${index + 1}
          </h4>
          ${
            day.atividades && Array.isArray(day.atividades)
              ? day.atividades
                  .map(
                    (activity: any) => `
            <div style="margin-bottom: 12px; padding: 10px; background-color: white; border-radius: 6px; border-left: 3px solid #10B981;">
              <p style="margin: 0; font-weight: bold; color: #374151;">${
                activity?.nome || activity?.atividade || "Atividade"
              }</p>
              ${
                activity?.horario
                  ? `<p style="margin: 4px 0 0 0; color: #6B7280; font-size: 11px;">⏰ ${activity.horario}</p>`
                  : ""
              }
              ${
                activity?.local
                  ? `<p style="margin: 4px 0 0 0; color: #6B7280; font-size: 11px;">📍 ${activity.local}</p>`
                  : ""
              }
              ${
                activity?.duracao
                  ? `<p style="margin: 4px 0 0 0; color: #6B7280; font-size: 11px;">⏱️ ${activity.duracao}</p>`
                  : ""
              }
              ${
                activity?.descricao || activity?.motivoPersonalizacao
                  ? `<p style="margin: 8px 0 0 0; color: #4B5563; font-size: 11px;">${
                      activity.descricao || activity.motivoPersonalizacao || ""
                    }</p>`
                  : ""
              }
            </div>
          `
                  )
                  .join("")
              : '<p style="color: #6B7280; font-style: italic;">Nenhuma atividade programada para este dia.</p>'
          }
        </div>
      `
        )
        .join("")}
    </div>
  `;
};

const generateAccommodationsHTML = (accommodations: any): string => {
  if (!accommodations) return "";

  const accommodationArray = Array.isArray(accommodations)
    ? accommodations
    : [
        { nome: accommodations.hotelPrincipal, tipo: "Principal" },
        ...(accommodations.alternativas || []).map((alt: string) => ({
          nome: alt,
          tipo: "Alternativa",
        })),
      ];

  return `
    <div style="margin-bottom: 25px;">
      <h3 style="color: #1F2937; margin: 0 0 15px 0; font-size: 18px; border-left: 4px solid #F59E0B; padding-left: 12px;">
        🏨 Recomendações de Hospedagem
      </h3>
      ${accommodationArray
        .map(
          (acc: any) => `
        <div style="margin-bottom: 15px; background-color: #FFFBEB; padding: 12px; border-radius: 6px; border: 1px solid #FED7AA;">
          <p style="margin: 0; font-weight: bold; color: #92400E;">${
            acc.nome || acc.hotel || acc.tipo || "Hospedagem"
          }</p>
          ${
            acc.localizacao
              ? `<p style="margin: 4px 0 0 0; color: #B45309; font-size: 11px;">📍 ${acc.localizacao}</p>`
              : ""
          }
          ${
            acc.preco
              ? `<p style="margin: 4px 0 0 0; color: #B45309; font-size: 11px;">💰 ${acc.preco}</p>`
              : ""
          }
          ${
            acc.descricao
              ? `<p style="margin: 8px 0 0 0; color: #78350F; font-size: 11px;">${acc.descricao}</p>`
              : ""
          }
        </div>
      `
        )
        .join("")}
    </div>
  `;
};

const generateBudgetHTML = (budget: any): string => {
  if (!budget) return "";

  return `
    <div style="margin-bottom: 25px;">
      <h3 style="color: #1F2937; margin: 0 0 15px 0; font-size: 18px; border-left: 4px solid #EF4444; padding-left: 12px;">
        💰 Orçamento Detalhado
      </h3>
      <div style="background-color: #FEF2F2; padding: 15px; border-radius: 8px; border: 1px solid #FECACA;">
        ${
          budget.total
            ? `<p style="margin: 0 0 10px 0; font-weight: bold; color: #991B1B; font-size: 14px;">Total Estimado: ${budget.total}</p>`
            : ""
        }
        ${Object.entries(budget)
          .filter(([key]) => key !== "total" && key !== "observacao")
          .map(
            ([key, value]) => `
          <p style="margin: 4px 0; color: #B91C1C; font-size: 11px;">
            <strong>${
              key.charAt(0).toUpperCase() + key.slice(1)
            }:</strong> ${value}
          </p>
        `
          )
          .join("")}
        ${
          budget.observacao
            ? `<p style="margin: 8px 0 0 0; color: #B91C1C; font-size: 11px; font-style: italic;"><strong>Observação:</strong> ${budget.observacao}</p>`
            : ""
        }
      </div>
    </div>
  `;
};

const generateExperiencesHTML = (experiences: any[]): string => {
  if (!experiences || experiences.length === 0) return "";

  return `
    <div style="margin-bottom: 25px;">
      <h3 style="color: #1F2937; margin: 0 0 15px 0; font-size: 18px; border-left: 4px solid #8B5CF6; padding-left: 12px;">
        ⭐ Experiências Únicas
      </h3>
      ${experiences
        .map(
          (exp) => `
        <div style="margin-bottom: 12px; background-color: #FAF5FF; padding: 12px; border-radius: 6px; border: 1px solid #E9D5FF;">
          <p style="margin: 0; font-weight: bold; color: #6B21A8;">${
            exp.nome || exp.experiencia || exp.titulo || "Experiência"
          }</p>
          ${
            exp.descricao
              ? `<p style="margin: 6px 0 0 0; color: #7C3AED; font-size: 11px;">${exp.descricao}</p>`
              : ""
          }
        </div>
      `
        )
        .join("")}
    </div>
  `;
};

const generateHiddenGemsHTML = (gems: any[]): string => {
  if (!gems || gems.length === 0) return "";

  return `
    <div style="margin-bottom: 25px;">
      <h3 style="color: #1F2937; margin: 0 0 15px 0; font-size: 18px; border-left: 4px solid #06B6D4; padding-left: 12px;">
        💎 Joias Escondidas
      </h3>
      ${gems
        .map(
          (gem) => `
        <div style="margin-bottom: 12px; background-color: #ECFEFF; padding: 12px; border-radius: 6px; border: 1px solid #A5F3FC;">
          <p style="margin: 0; font-weight: bold; color: #0E7490;">${
            gem.nome || gem.local || gem.titulo || "Local"
          }</p>
          ${
            gem.descricao
              ? `<p style="margin: 6px 0 0 0; color: #0891B2; font-size: 11px;">${gem.descricao}</p>`
              : ""
          }
        </div>
      `
        )
        .join("")}
    </div>
  `;
};

const generateExpertTipsHTML = (tips: any[]): string => {
  if (!tips || tips.length === 0) return "";

  return `
    <div style="margin-bottom: 25px;">
      <h3 style="color: #1F2937; margin: 0 0 15px 0; font-size: 18px; border-left: 4px solid #F97316; padding-left: 12px;">
        💡 Dicas de Especialistas
      </h3>
      ${tips
        .map(
          (tip) => `
        <div style="margin-bottom: 12px; background-color: #FFF7ED; padding: 12px; border-radius: 6px; border: 1px solid #FDBA74;">
          <p style="margin: 0; color: #C2410C; font-size: 11px;">${
            tip.dica || tip.titulo || tip
          }</p>
        </div>
      `
        )
        .join("")}
    </div>
  `;
};

const generateSpecialConsiderationsHTML = (considerations: any): string => {
  if (!considerations) return "";

  const considerationArray = Array.isArray(considerations)
    ? considerations
    : [considerations];

  return `
    <div style="margin-bottom: 25px;">
      <h3 style="color: #1F2937; margin: 0 0 15px 0; font-size: 18px; border-left: 4px solid #84CC16; padding-left: 12px;">
        ⚠️ Considerações Especiais
      </h3>
      ${considerationArray
        .map(
          (consideration: any) => `
        <div style="margin-bottom: 12px; background-color: #F7FEE7; padding: 12px; border-radius: 6px; border: 1px solid #BEF264;">
          <p style="margin: 0; color: #4D7C0F; font-size: 11px;">${
            typeof consideration === "string"
              ? consideration
              : consideration.consideracao ||
                consideration.titulo ||
                "Consideração especial"
          }</p>
        </div>
      `
        )
        .join("")}
    </div>
  `;
};
