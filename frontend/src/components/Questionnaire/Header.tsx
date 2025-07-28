
 export default function Header() {
  return (
    <div className="text-center mb-10"> {/* text-center para centralizar, mb-10 para margem inferior */}
      <h1 className="text-4xl font-bold text-gray-700 mb-2"> {/* Tamanho da fonte, negrito, cor, margem */}
        Vamos planejar sua viagem!
      </h1>
      <p className="text-lg text-gray-600"> {/* Tamanho da fonte, cor */}
        Preencha as informações abaixo para receber roteiros personalizados
      </p>
    </div>
  );
}
