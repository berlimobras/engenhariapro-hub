export interface PromptItem {
  id: number;
  title: string;
  content: string;
  orientation: string;
}

export const promptsData: PromptItem[] = [
  {
    id: 1,
    title: "Cálculo de Volume de Concreto para Viga",
    content: `Calcule o volume de concreto necessário para uma viga com as seguintes dimensões:
- Comprimento: {comprimento} metros
- Largura: {largura} metros
- Altura: {altura} metros`,
    orientation: "Substitua as variáveis {comprimento}, {largura} e {altura} pelos valores reais da viga do seu projeto para obter um cálculo preciso."
  },
  {
    id: 2,
    title: "Análise de Custo por Metro Quadrado",
    content: `Faça uma análise de custo por metro quadrado para a construção de um edifício com os seguintes dados:
- Área total construída: {area_total} m²
- Custo total da obra: R$ {custo_total}`,
    orientation: "Insira a área total e o custo global para que a IA gere a relação de R$/m² e forneça insights sobre a viabilidade."
  },
  {
    id: 3,
    title: "Cronograma de Obra para Residência Unifamiliar",
    content: `Elabore um cronograma físico-financeiro para a construção de uma residência unifamiliar com:
- Área construída: {area_construida} m²
- Duração estimada da obra: {duracao} meses
- Etapas principais: {etapas}`,
    orientation: "Detalhe as etapas principais (ex: fundação, alvenaria, cobertura) para um cronograma mais alinhado com a sua realidade."
  },
  {
    id: 4,
    title: "Dimensionamento de Sapata Isolada",
    content: `Dimensione uma sapata isolada para o seguinte pilar:
- Carga atuante: {carga} kN
- Tensão admissível do solo: {tensao_admissivel} kN/m²`,
    orientation: "Use dados do seu laudo de sondagem (SPT) para a tensão admissível e a carga do projeto estrutural."
  },
  {
    id: 5,
    title: "Lista de Materiais para Alvenaria",
    content: `Gere uma lista detalhada de materiais necessários para executar alvenaria em:
- Área: {area} m²
- Tipo de bloco: {tipo_bloco}
- Espessura da parede: {espessura_parede}`,
    orientation: "Especifique o tipo de bloco (ex: cerâmico 9x19x19, concreto) para que a IA calcule as argamassas e perdas corretamente."
  },
  {
    id: 6,
    title: "Cálculo de Consumo de Argamassa",
    content: `Calcule o consumo de argamassa para revestimento de parede com as seguintes especificações:
- Área: {area} m²
- Espessura da argamassa: {espessura} cm`,
    orientation: "A espessura padrão costuma variar de 1.5 a 3.0 cm. Insira seu padrão de projeto."
  },
  {
    id: 7,
    title: "Relatório Técnico de Vistoria de Obra",
    content: `Crie um relatório técnico de vistoria para a obra localizada em {endereco}, considerando:
- Data da vistoria: {data}
- Itens inspecionados: {itens}
- Observações relevantes: {observacoes}`,
    orientation: "Passe as observações de forma crua e deixe a IA formatar com linguagem técnica e profissional."
  },
  {
    id: 8,
    title: "Orçamento Básico de Fundação",
    content: `Crie um orçamento básico para execução de fundação com:
- Tipo de fundação: {tipo}
- Quantidade de estacas ou sapatas: {quantidade}
- Preço unitário estimado: R$ {preco_unitario}`,
    orientation: "Ideal para estudos de viabilidade onde você precisa de uma estimativa rápida de custos."
  },
  {
    id: 9,
    title: "Verificação de Inclinação de Rampa",
    content: `Verifique se a rampa com comprimento de {comprimento} m e desnível de {desnivel} m atende à norma de acessibilidade.`,
    orientation: "A IA utilizará a NBR 9050 como base para responder se os limites de inclinação (geralmente 8.33%) foram respeitados."
  },
  {
    id: 10,
    title: "Especificação Técnica de Concreto",
    content: `Crie uma especificação técnica para concreto usinado a ser utilizado em:
- Tipo de estrutura: {estrutura}
- fck requerido: {fck} MPa
- Ambiente de exposição: {ambiente}`,
    orientation: "Informe a classe de agressividade ambiental (ex: urbana, marinha) para indicações corretas de abatimento e aditivos."
  },
  {
    id: 11,
    title: "Dimensionamento de Escada",
    content: `Calcule as dimensões ideais (espelho e piso) para uma escada com:
- Pé-direito: {pe_direito} m
- Número de degraus: {num_degraus}`,
    orientation: "A IA fará a verificação pela fórmula de Blondel (2E + P = 64cm)."
  },
  {
    id: 12,
    title: "Planejamento de Segurança da Obra",
    content: `Crie um plano básico de segurança do trabalho para uma obra com:
- Número de operários: {num_operarios}
- Tipos de atividades executadas: {atividades}`,
    orientation: "Isso gerará as diretrizes iniciais para o seu PCMAT/PGR da obra."
  },
  {
    id: 13,
    title: "Estudo de Viabilidade Técnica",
    content: `Realize um estudo de viabilidade técnica para construir em um terreno de:
- Área: {area_terreno} m²
- Zoneamento: {zoneamento}
- Topografia: {topografia}`,
    orientation: "Especifique o zoneamento (ex: ZRM, ZC) se souber, para a IA sugerir taxas de ocupação e recuos."
  },
  {
    id: 14,
    title: "Check-list de Início de Obra",
    content: `Gere um check-list de itens obrigatórios para início de obra:
- Tipo de obra: {tipo_obra}
- Localização: {local}
- Requisitos legais e técnicos: {requisitos}`,
    orientation: "Excelente para não esquecer alvarás, ligações provisórias de água/luz e tapumes."
  },
  {
    id: 15,
    title: "Desempenho Térmico da Edificação",
    content: `Avalie o desempenho térmico de uma edificação com base nas seguintes informações:
- Tipo de vedação: {vedacao}
- Orientação solar predominante: {orientacao}
- Localização geográfica: {localizacao}`,
    orientation: "A IA baseará a resposta na NBR 15575 (Norma de Desempenho)."
  },
  {
    id: 16,
    title: "Lista de Equipamentos de Canteiro",
    content: `Liste os equipamentos necessários para um canteiro de obras de porte {porte}, considerando:
- Tipo de construção: {tipo_construcao}
- Duração estimada: {duracao}`,
    orientation: "Ajuda a orçar locações de betoneiras, andaimes, escoras e ferramentas elétricas."
  },
  {
    id: 17,
    title: "Planejamento de Concretagem",
    content: `Planeje a concretagem para uma laje com as seguintes características:
- Área: {area} m²
- Espessura: {espessura} cm
- Volume de concreto: {volume} m³`,
    orientation: "O plano incluirá ritmo de chegada de caminhões, vibradores necessários e equipe de acabamento."
  },
  {
    id: 18,
    title: "Inspeção de Patologias em Estrutura",
    content: `Realize uma inspeção técnica para identificar patologias estruturais em:
- Tipo de estrutura: {estrutura}
- Sintomas observados: {sintomas}
- Localização da obra: {local}`,
    orientation: "Descreva sintomas como 'fissuras a 45 graus' ou 'armadura exposta com corrosão' para um diagnóstico assertivo."
  },
  {
    id: 19,
    title: "Quantitativo de Materiais para Laje",
    content: `Calcule o quantitativo de materiais para uma laje maciça com:
- Área: {area} m²
- Altura: {altura} cm
- Tipo de concreto: {tipo_concreto}`,
    orientation: "A IA também fará uma estimativa de aço com base em taxas médias para essa tipologia."
  },
  {
    id: 20,
    title: "Análise de Viabilidade de Reforma",
    content: `Faça uma análise de viabilidade técnica e econômica para reformar:
- Tipo de imóvel: {tipo_imovel}
- Área total: {area_total} m²
- Finalidade da reforma: {finalidade}`,
    orientation: "Fornece insights sobre custos imprevistos e potenciais retornos no valor do imóvel."
  },
  {
    id: 21,
    title: "Cálculo de Armadura para Pilar",
    content: `Calcule a armadura longitudinal e transversal de um pilar com:
- Carga: {carga} kN
- Altura: {altura} m
- Seção: {secao}`,
    orientation: "Lembre-se que este é um cálculo de pré-dimensionamento, devendo sempre ser validado por um software/engenheiro estrutural."
  },
  {
    id: 22,
    title: "Dimensionamento de Caixa de Inspeção",
    content: `Dimensione uma caixa de inspeção para sistema de esgoto residencial com:
- Número de ramais: {num_ramais}
- Profundidade da rede: {profundidade} m`,
    orientation: "A IA seguirá as recomendações da NBR 8160 para caixas de inspeção sanitária."
  },
  {
    id: 23,
    title: "Planejamento de Instalações Hidrossanitárias",
    content: `Crie um plano de instalações hidrossanitárias para uma residência com:
- Número de banheiros: {num_banheiros}
- Área total: {area_total} m²`,
    orientation: "Gera a setorização e estimativa de descidas de água fria e prumadas de esgoto."
  },
  {
    id: 24,
    title: "Recomendação de Materiais Sustentáveis",
    content: `Recomende materiais sustentáveis para uma obra com foco em:
- Redução de impacto ambiental
- Tipo de construção: {tipo_construcao}
- Localização: {localizacao}`,
    orientation: "Ótimo para buscar certificações LEED, AQUA ou apenas agregar valor ecológico à construção."
  },
  {
    id: 25,
    title: "Análise de Terraplanagem",
    content: `Analise o volume de corte e aterro necessário para nivelar um terreno com:
- Área: {area_terreno} m²
- Cotas iniciais e finais: {cotas}`,
    orientation: "Seja claro nas cotas (ex: cota atual +2.0m, cota final do platô +1.0m) para o cálculo bater."
  },
  {
    id: 26,
    title: "Relatório de Execução de Fundação",
    content: `Elabore um relatório técnico sobre a execução das fundações da obra:
- Tipo de fundação: {tipo_fundacao}
- Data de execução: {data}
- Observações importantes: {observacoes}`,
    orientation: "Documento crucial para a qualidade; não esqueça de mencionar eventuais problemas com o lençol freático."
  },
  {
    id: 27,
    title: "Planejamento de Acompanhamento de Obra",
    content: `Crie um plano de acompanhamento técnico da obra com visitas:
- Frequência das visitas: {frequencia}
- Responsável técnico: {responsavel}`,
    orientation: "Organiza o cronograma de idas à obra para medições e validações críticas."
  },
  {
    id: 28,
    title: "Especificação de Materiais de Acabamento",
    content: `Liste os materiais recomendados para o acabamento de:
- Piso: {piso}
- Paredes: {paredes}
- Teto: {teto}`,
    orientation: "Solicite na descrição que a IA avalie durabilidade, manutenção e custo-benefício dos acabamentos."
  },
  {
    id: 29,
    title: "Planejamento de Drenagem Pluvial",
    content: `Desenvolva um plano de drenagem pluvial para um terreno com:
- Área impermeabilizada: {area_impermeavel} m²
- Índice pluviométrico local: {indice} mm/h`,
    orientation: "Fundamental para dimensionamento de calhas, rufos e condutores."
  },
  {
    id: 30,
    title: "Estimativa de Mão de Obra",
    content: `Calcule a quantidade estimada de trabalhadores para uma obra com:
- Área construída: {area} m²
- Tipo de construção: {tipo_construcao}
- Duração da obra: {duracao} meses`,
    orientation: "Permite que você monte seu histograma de mão de obra para contratações."
  },
  {
    id: 31,
    title: "Cálculo de Consumo de Aço para Viga",
    content: `Estime o consumo de aço por metro linear para uma viga com:
- Largura: {largura} cm
- Altura: {altura} cm
- Comprimento: {comprimento} m
- fck do concreto: {fck} MPa`,
    orientation: "Retorna uma taxa de aço estimada (kg/m³) útil para orçamentação preliminar."
  },
  {
    id: 32,
    title: "Checklist de Encerramento de Obra",
    content: `Crie um checklist completo para encerramento de obra incluindo:
- Documentação exigida
- Inspeções finais
- Entregas técnicas e legais
- Obra localizada em: {local}`,
    orientation: "Útil para organizar vistorias do Habite-se, CND da Receita, e entrega das chaves."
  },
  {
    id: 33,
    title: "Planejamento de Obra com Turno Noturno",
    content: `Planeje a execução de uma obra com turnos diurnos e noturnos:
- Tipo de obra: {tipo_obra}
- Duração prevista: {duracao}
- Equipe envolvida: {equipe}`,
    orientation: "Considere orientações extras sobre restrições de ruído, iluminação de canteiro e segurança do trabalho."
  },
  {
    id: 34,
    title: "Cronograma de Execução de Laje",
    content: `Elabore um cronograma para execução de uma laje considerando:
- Área: {area} m²
- Equipe disponível: {equipe}
- Equipamentos usados: {equipamentos}`,
    orientation: "A IA ordenará processos como fôrmas, escoramento, armação, instalações embutidas e concretagem."
  },
  {
    id: 35,
    title: "Detalhamento de Corte em Terreno Acidentado",
    content: `Detalhe a execução de cortes em um terreno com declividade de:
- Inclinação: {inclinacao}%
- Extensão: {extensao} m
- Tipo de solo: {tipo_solo}`,
    orientation: "Fornece sugestões de contenção, taludes e logística para escoamento de terra."
  },
  {
    id: 36,
    title: "Planejamento de Impermeabilização",
    content: `Crie um plano de impermeabilização para uma cobertura com:
- Área total: {area_total} m²
- Tipo de cobertura: {tipo}
- Material desejado: {material}`,
    orientation: "Inclui dicas de caimentos, juntas e testes de estanqueidade obrigatórios."
  },
  {
    id: 37,
    title: "Descrição Técnica para ART",
    content: `Escreva uma descrição técnica para a Anotação de Responsabilidade Técnica de:
- Tipo de serviço: {tipo_servico}
- Cliente: {cliente}
- Local da obra: {local}`,
    orientation: "Textos enxutos e dentro dos padrões dos CREAs para preenchimento rápido."
  },
  {
    id: 38,
    title: "Especificação Técnica de Fôrmas",
    content: `Crie uma especificação para o sistema de fôrmas a ser utilizado em:
- Tipo de estrutura: {estrutura}
- Material da fôrma: {material}
- Reutilização estimada: {reutilizacao}`,
    orientation: "Ajuda na escolha entre madeirite, fôrmas metálicas ou plásticas conforme o número de reaproveitamentos."
  },
  {
    id: 39,
    title: "Plano de Logística de Canteiro",
    content: `Elabore um plano de logística para um canteiro com:
- Número de funcionários: {funcionarios}
- Área total do terreno: {area}
- Principais atividades: {atividades}`,
    orientation: "Inclui dimensionamento de refeitório, banheiros (NR-18) e fluxo de materiais."
  },
  {
    id: 40,
    title: "Cálculo de Custo de Transporte de Materiais",
    content: `Calcule o custo estimado para transportar materiais entre:
- Origem: {origem}
- Destino: {destino}
- Tipo de carga: {carga}
- Distância: {distancia} km`,
    orientation: "Excelente para validar preços de fretes e decidir sobre fornecedores locais vs. externos."
  },
  {
    id: 41,
    title: "Plano de Controle Tecnológico do Concreto",
    content: `Descreva um plano de controle tecnológico do concreto para:
- Tipo de obra: {tipo_obra}
- Volume de concreto: {volume} m³
- fck: {fck} MPa`,
    orientation: "Define a amostragem de corpos de prova e periodicidade dos rompimentos aos 7, 14 e 28 dias."
  },
  {
    id: 42,
    title: "Especificação de Projeto Estrutural",
    content: `Crie uma especificação técnica para o projeto estrutural de:
- Tipo de edificação: {tipo}
- Número de pavimentos: {pavimentos}
- Sistema estrutural adotado: {sistema}`,
    orientation: "Documento de premissas a ser enviado ao calculista estrutural."
  },
  {
    id: 43,
    title: "Análise de Desempenho Acústico",
    content: `Avalie o desempenho acústico de uma edificação com:
- Tipo de paredes: {paredes}
- Localização da edificação: {localizacao}
- Exigência do cliente: {exigencia}`,
    orientation: "A IA sugerirá soluções de isolamento (lã de rocha, vidros duplos) se as paredes não atingirem a norma."
  },
  {
    id: 44,
    title: "Especificação de Pintura Externa",
    content: `Descreva as especificações da pintura externa para:
- Tipo de acabamento: {acabamento}
- Tipo de tinta: {tinta}
- Área: {area} m²`,
    orientation: "Aborda preparo de base, seladores, número de demãos e cuidados com umidade."
  },
  {
    id: 45,
    title: "Cálculo de Retirada de Entulho",
    content: `Calcule o volume e o custo estimado para retirada de entulho de:
- Área da demolição: {area} m²
- Tipo de material: {material}
- Distância ao destino: {distancia} km`,
    orientation: "Inclui o fator de empolamento (aumento de volume após demolição) no cálculo."
  },
  {
    id: 46,
    title: "Check-list de Fiscalização de Obra",
    content: `Monte um check-list de itens que devem ser fiscalizados semanalmente em:
- Tipo de obra: {tipo_obra}
- Fase atual: {fase}
- Responsável técnico: {responsavel}`,
    orientation: "Criação de rotinas para o gerente/coordenador da obra focar no que importa."
  },
  {
    id: 47,
    title: "Recomendação de Técnicas para Solo Instável",
    content: `Sugira técnicas de contenção ou estabilização para solo com:
- Tipo de instabilidade: {tipo}
- Tipo de solo: {solo}
- Localização da obra: {local}`,
    orientation: "A IA pode sugerir solo grampeado, muros de arrimo, injeções, dependendo do cenário."
  },
  {
    id: 48,
    title: "Especificação de Telhado Embutido",
    content: `Crie uma especificação técnica para um telhado embutido em:
- Tipo de cobertura: {tipo}
- Área: {area} m²
- Tipo de impermeabilização: {impermeabilizacao}`,
    orientation: "Focado em telhas metálicas/fibrocimento sobre platibandas, calhas e inclinação mínima."
  },
  {
    id: 49,
    title: "Cálculo de Volume de Aterro",
    content: `Calcule o volume necessário de aterro para:
- Área do terreno: {area} m²
- Altura média: {altura} m
- Tipo de solo: {tipo_solo}`,
    orientation: "A IA aplicará taxas de compactação do solo para determinar a quantidade a ser comprada em caminhões."
  },
  {
    id: 50,
    title: "Cronograma de Instalações Elétricas",
    content: `Crie um cronograma com etapas para execução da instalação elétrica de:
- Tipo de edificação: {tipo}
- Área construída: {area} m²
- Prazos estimados: {prazos}`,
    orientation: "Separa as fases de eletrodutos embutidos, fiação pós-reboco e acabamentos finais (espelhos e luminárias)."
  },
  {
    id: 51,
    title: "Identificação de Não Conformidades",
    content: `Liste possíveis não conformidades que podem surgir durante a execução de:
- Tipo de obra: {tipo_obra}
- Fase da obra: {fase}
- Norma técnica aplicada: {norma}`,
    orientation: "Treine seu olhar para prever e evitar falhas na qualidade."
  },
  {
    id: 52,
    title: "Recomendação de Layout de Escritório Técnico",
    content: `Sugira um layout funcional para escritório técnico com:
- Número de profissionais: {quantidade}
- Área disponível: {area} m²
- Tipos de serviços realizados: {servicos}`,
    orientation: "Dicas de ergonomia, iluminação e espaço para armazenamento de plantas A0."
  },
  {
    id: 53,
    title: "Modelo de Diário de Obra",
    content: `Crie um modelo de diário de obra contendo:
- Data: {data}
- Atividades executadas: {atividades}
- Clima: {clima}
- Observações do engenheiro: {observacoes}`,
    orientation: "Um relatório padronizado que te protege judicialmente em caso de atrasos por clima."
  },
  {
    id: 54,
    title: "Cálculo de Vazão para Drenagem",
    content: `Calcule a vazão necessária para o sistema de drenagem considerando:
- Área impermeabilizada: {area} m²
- Coeficiente de escoamento: {coeficiente}
- Intensidade pluviométrica: {intensidade} mm/h`,
    orientation: "Essencial para não ter áreas alagadas no projeto final."
  },
  {
    id: 55,
    title: "Estratégia para Redução de Custos",
    content: `Apresente estratégias viáveis para reduzir custos em uma obra de:
- Tipo: {tipo_obra}
- Tamanho da equipe: {equipe}
- Materiais predominantes: {materiais}`,
    orientation: "Usa os princípios da Construção Enxuta (Lean Construction) para sugerir melhorias."
  },
  {
    id: 56,
    title: "Dimensionamento de Calçada Acessível",
    content: `Dimensione uma calçada acessível com:
- Largura: {largura} m
- Inclinação longitudinal: {incl_long}%
- Inclinação transversal: {incl_trans}%`,
    orientation: "Valida os espaços de faixa livre, faixas de serviço e piso tátil."
  },
  {
    id: 57,
    title: "Modelo de Carta de Responsabilidade Técnica",
    content: `Crie um modelo de carta de responsabilidade técnica para:
- Cliente: {cliente}
- Obra: {obra}
- Tipo de serviço: {servico}`,
    orientation: "Documento oficializando a entrega técnica e limites de garantias."
  },
  {
    id: 58,
    title: "Planejamento para Reforma em Ambiente Ocupado",
    content: `Elabore um plano de reforma para ambiente com pessoas circulando:
- Tipo de ambiente: {ambiente}
- Medidas de segurança adotadas: {medidas}
- Horário de trabalho: {horario}`,
    orientation: "Foco extremo na redução de poeira (tapumes estancados), ruído e segurança de terceiros."
  },
  {
    id: 59,
    title: "Cálculo de Consumo de Tijolos",
    content: `Estime a quantidade de tijolos necessária para:
- Área de alvenaria: {area} m²
- Tipo de tijolo: {tipo_tijolo}
- Espessura de junta: {espessura} cm`,
    orientation: "A IA dará a quantidade exata por m² e adicionará taxas recomendadas de perda."
  },
  {
    id: 60,
    title: "Planejamento de Obra com Reaproveitamento de Água",
    content: `Crie um plano para reaproveitamento de água de chuva em:
- Tipo de edificação: {tipo}
- Área do telhado: {area} m²
- Filtro e armazenamento previstos: {filtro_armazenamento}`,
    orientation: "Sugere dimensões de cisternas e bombas para fins não potáveis."
  },
  {
    id: 61,
    title: "Modelo de Plano de Ataque para Execução de Obra",
    content: `Crie um plano de ataque detalhado para a execução da obra:
- Tipo de obra: {tipo_obra}
- Localização: {local}
- Prazo total: {prazo} dias`,
    orientation: "Diretrizes macro de como a obra deve avançar: onde começar, frente de serviços, etc."
  },
  {
    id: 62,
    title: "Avaliação de Capacidade Portante do Solo",
    content: `Avalie a capacidade portante de um solo com:
- Tipo de solo: {tipo_solo}
- Dados de sondagem: {dados_sondagem}
- Localização: {local}`,
    orientation: "Insira os valores de NSPT das primeiras camadas para a IA sugerir tipos de fundação viáveis."
  },
  {
    id: 63,
    title: "Cálculo de Inclinação de Telhado",
    content: `Calcule a inclinação ideal para um telhado com:
- Tipo de telha: {tipo_telha}
- Largura da base: {base} m
- Altura desejada: {altura} m`,
    orientation: "Garante que o projeto não terá retornos de água e vazamentos por sub-inclinação."
  },
  {
    id: 64,
    title: "Dimensionamento de Coluna de Concreto",
    content: `Dimensione uma coluna de concreto armado para:
- Carga axial: {carga_axial} kN
- Altura livre: {altura} m
- Tipo de concreto: {tipo_concreto}`,
    orientation: "Cálculo rápido para verificação de flambagem e seção mínima."
  },
  {
    id: 65,
    title: "Lista de Documentos para Regularização de Obra",
    content: `Liste os documentos obrigatórios para regularizar uma obra com:
- Município: {municipio}
- Tipo de construção: {tipo_construcao}
- Área construída: {area_construida} m²`,
    orientation: "Passo a passo desde Alvará de Construção até CND/INSS e averbação no cartório."
  },
  {
    id: 66,
    title: "Planejamento de Inspeções Periódicas",
    content: `Crie um cronograma de inspeções periódicas com:
- Frequência: {frequencia}
- Itens a serem inspecionados: {itens}
- Responsável pela inspeção: {responsavel}`,
    orientation: "Útil para laudos de manutenção predial e garantias."
  },
  {
    id: 67,
    title: "Cálculo de Área de Ventilação Natural",
    content: `Calcule a área mínima necessária para ventilação natural de:
- Cômodo: {comodo}
- Área do ambiente: {area_ambiente} m²
- Normas locais: {normas}`,
    orientation: "Atende aos Códigos de Obras Municipais (ex: 1/6 da área do piso para dormitórios)."
  },
  {
    id: 68,
    title: "Check-list para Aprovação de Projeto na Prefeitura",
    content: `Crie um check-list com os itens essenciais para aprovar um projeto na prefeitura de:
- Cidade: {cidade}
- Tipo de projeto: {tipo_projeto}`,
    orientation: "Impede o temido 'comunique-se' por esquecimento de taxas de permeabilidade e recuos."
  },
  {
    id: 69,
    title: "Planejamento de Escavação com Contenção",
    content: `Elabore um plano para escavação em terreno com contenção:
- Profundidade da escavação: {profundidade} m
- Tipo de contenção: {tipo_contencao}`,
    orientation: "A IA orientará sobre perfis de contenção temporária vs. definitiva e etapas executivas."
  },
  {
    id: 70,
    title: "Simulação de Cronograma com Atrasos",
    content: `Simule um cronograma considerando atrasos de:
- Tipo de atividade: {atividade}
- Dias de atraso estimados: {atraso_dias}
- Impacto geral na obra: {impacto}`,
    orientation: "Analisa o impacto das atividades críticas no caminho crítico (CPM) do projeto."
  },
  {
    id: 71,
    title: "Relatório de Andamento da Obra",
    content: `Gere um relatório técnico sobre o andamento da obra em:
- Data: {data}
- Fase atual: {fase}
- Avanço físico: {progresso}%`,
    orientation: "Ótimo para envio semanal aos clientes de forma elegante e técnica."
  },
  {
    id: 72,
    title: "Comparativo de Custos Entre Métodos Construtivos",
    content: `Compare os custos entre os métodos:
- Método 1: {metodo1}
- Método 2: {metodo2}
- Área construída: {area_construida} m²`,
    orientation: "Ex: Compare Alvenaria Estrutural vs. Concreto Armado para apresentação de soluções."
  },
  {
    id: 73,
    title: "Estimativa de Tempo para Conclusão da Obra",
    content: `Estime o tempo restante para conclusão da obra com base em:
- Avanço físico atual: {percentual}%
- Equipe disponível: {equipe}
- Etapas restantes: {etapas}`,
    orientation: "Reprograme o cronograma com base na produtividade real observada."
  },
  {
    id: 74,
    title: "Cálculo de Perda de Materiais",
    content: `Calcule o percentual de perda de materiais na obra:
- Tipo de material: {material}
- Quantidade adquirida: {quantidade}
- Quantidade utilizada: {utilizado}`,
    orientation: "Audita a eficiência da equipe e ajuda em compras futuras."
  },
  {
    id: 75,
    title: "Especificação Técnica de Vedação Interna",
    content: `Crie uma especificação para o sistema de vedação interna com:
- Tipo de parede: {tipo_parede}
- Isolamento acústico desejado: {isolamento}`,
    orientation: "Detalha Drywall (ST, RU, RF), preenchimentos acústicos e modulação estrutural."
  },
  {
    id: 76,
    title: "Lista de Checkpoints para Medição Mensal",
    content: `Gere uma lista de checkpoints para fazer a medição mensal da obra:
- Fase atual: {fase}
- Critérios de medição: {criterios}`,
    orientation: "Orienta como medir serviços com empreiteiros (ex: reboco mede vão de porta?)."
  },
  {
    id: 77,
    title: "Modelo de Relatório de Não Conformidade",
    content: `Crie um relatório para registrar uma não conformidade observada em:
- Serviço executado: {servico}
- Data: {data}
- Ação corretiva: {acao}`,
    orientation: "Padrão ISO 9001 / PBQP-H para garantir a qualidade total."
  },
  {
    id: 78,
    title: "Planejamento de Execução com Escassez de Mão de Obra",
    content: `Crie um plano para manter o andamento da obra com mão de obra reduzida:
- Quantidade disponível: {disponivel}
- Atividades críticas: {atividades}`,
    orientation: "A IA sugerirá realocação tática e uso intensivo de mecanização."
  },
  {
    id: 79,
    title: "Especificação Técnica para Piso Industrial",
    content: `Detalhe as especificações para execução de um piso industrial com:
- Carga prevista: {carga} kN/m²
- Acabamento desejado: {acabamento}
- Espessura: {espessura} cm`,
    orientation: "Inclui armadura em telas soldadas, planicidade (F-Numbers) e juntas secadas cortadas."
  },
  {
    id: 80,
    title: "Planejamento de Reforma em Condomínio",
    content: `Planeje uma reforma em ambiente condominial com:
- Tipo de obra: {tipo_obra}
- Horário permitido: {horario}
- Aprovação de assembleia: {aprovacao}`,
    orientation: "Aborda NBR 16280 e regras rigorosas de içamentos e acesso de materiais."
  },
  {
    id: 81,
    title: "Lista de Materiais para Fundação Profunda",
    content: `Liste os materiais necessários para fundação profunda do tipo:
- Tipo: {tipo}
- Quantidade de estacas: {quantidade}`,
    orientation: "Diferencia insumos para Estacas Hélice Contínua, Cravadas ou Strauss."
  },
  {
    id: 82,
    title: "Verificação de Normas de Acessibilidade",
    content: `Verifique a conformidade com normas de acessibilidade para:
- Tipo de edificação: {tipo}
- Itens a inspecionar: {itens}`,
    orientation: "Garante dimensões de portas, vãos e equipamentos PNE corretos."
  },
  {
    id: 83,
    title: "Plano de Redução de Ruídos na Obra",
    content: `Desenvolva um plano para mitigar ruídos em:
- Obra localizada em: {local}
- Período de execução: {periodo}
- Tipo de atividades: {atividades}`,
    orientation: "Evita multas ambientais e reclamações de vizinhança na sua gestão."
  },
  {
    id: 84,
    title: "Planejamento de Obra com Alta Rotatividade",
    content: `Crie um plano para lidar com alta rotatividade na obra:
- Número médio de demissões/mês: {media_demissoes}
- Etapas críticas da obra: {etapas}`,
    orientation: "Soluções de retenção, pacotes de produtividade e treinamentos rápidos."
  },
  {
    id: 85,
    title: "Estimativa de Vida Útil de Materiais",
    content: `Estime a vida útil dos seguintes materiais utilizados na obra:
- Material 1: {material1}
- Material 2: {material2}
- Condições ambientais: {condicoes}`,
    orientation: "Focado no manual do proprietário e no plano de manutenção."
  },
  {
    id: 86,
    title: "Análise de Risco de Acidentes na Obra",
    content: `Crie um relatório de análise de risco para:
- Tipo de atividade: {atividade}
- Local da obra: {local}
- Frequência da tarefa: {frequencia}`,
    orientation: "Documento de APR (Análise Preliminar de Risco) super rápido."
  },
  {
    id: 87,
    title: "Cálculo de Consumo de Água na Obra",
    content: `Estime o consumo médio de água por mês para uma obra com:
- Número de funcionários: {funcionarios}
- Tipo de obra: {tipo_obra}`,
    orientation: "Dimensionamento provisório de ligações hidráulicas."
  },
  {
    id: 88,
    title: "Planejamento de Manutenção Pós-obra",
    content: `Crie um plano de manutenção preventiva para:
- Tipo de edificação: {tipo}
- Frequência de inspeção: {frequencia}
- Sistemas a revisar: {sistemas}`,
    orientation: "Entregue como valor agregado para o cliente final junto com as chaves."
  },
  {
    id: 89,
    title: "Comparação de Eficiência entre Concretagens",
    content: `Compare a eficiência entre dois métodos de concretagem em:
- Área: {area} m²
- Condições ambientais: {condicoes}
- Volume aplicado: {volume}`,
    orientation: "Analisa, por exemplo, bomba lança vs bomba estacionária vs grua."
  },
  {
    id: 90,
    title: "Plano de Contenção de Água Subterrânea",
    content: `Desenvolva um plano de contenção de água subterrânea para:
- Tipo de fundação: {tipo_fundacao}
- Profundidade: {profundidade} m
- Solo predominante: {solo}`,
    orientation: "Uso de rebaixamento de lençol freático (Ponteiras, Poços)."
  },
  {
    id: 91,
    title: "Definição de Critérios de Aceite de Concreto",
    content: `Defina os critérios técnicos para aceite do concreto na obra:
- Tipo de estrutura: {estrutura}
- fck especificado: {fck} MPa
- Normas aplicáveis: {normas}`,
    orientation: "Validações de Slump Test, laudos da concreteira e rastreabilidade."
  },
  {
    id: 92,
    title: "Relatório de Recebimento de Materiais",
    content: `Crie um modelo de relatório para recebimento de materiais:
- Material recebido: {material}
- Quantidade: {quantidade}
- Fornecedor: {fornecedor}
- Data: {data}`,
    orientation: "Documento FVS (Ficha de Verificação de Serviços/Materiais)."
  },
  {
    id: 93,
    title: "Análise de Consumo de Energia em Canteiro",
    content: `Analise o consumo mensal de energia elétrica no canteiro da obra:
- Equipamentos principais: {equipamentos}
- Horas de funcionamento por dia: {horas}
- Duração da obra: {duracao} meses`,
    orientation: "Define necessidade de subestações provisórias e medidores adequados."
  },
  {
    id: 94,
    title: "Recomendação de Equipamentos de Proteção Individual (EPI)",
    content: `Recomende os EPIs obrigatórios para:
- Atividade: {atividade}
- Local da execução: {local}
- Número de trabalhadores: {quantidade}`,
    orientation: "Ajuda na listagem e compras imediatas para liberar o início de novas frentes."
  },
  {
    id: 95,
    title: "Especificação de Revestimento para Fachada",
    content: `Defina a especificação técnica de revestimento para fachada de:
- Tipo de edificação: {tipo}
- Altura total: {altura} m
- Exposição ao sol/chuva: {exposicao}`,
    orientation: "Garante durabilidade e especifica juntas de movimentação corretas."
  },
  {
    id: 96,
    title: "Planejamento de Obra Modular",
    content: `Crie um plano de execução para uma construção modular com:
- Tipo de módulos: {tipo_modulo}
- Quantidade total: {quantidade}
- Prazo de montagem: {prazo}`,
    orientation: "Foco total na logística do içamento e sequenciamento das conexões secas."
  },
  {
    id: 97,
    title: "Detalhamento de Junta de Dilatação",
    content: `Detalhe o uso de junta de dilatação para:
- Tipo de estrutura: {estrutura}
- Comprimento total: {comprimento} m
- Material da junta: {material}`,
    orientation: "Previne aparecimento de trincas catastróficas em estruturas extensas."
  },
  {
    id: 98,
    title: "Cálculo de Peso Próprio de Estrutura",
    content: `Calcule o peso próprio total da estrutura com:
- Tipo de elementos estruturais: {elementos}
- Volume total: {volume} m³
- Densidade média: {densidade} kg/m³`,
    orientation: "Validação de contra-pesos para cálculos de estabilidade global."
  },
  {
    id: 99,
    title: "Simulação de Atraso por Falta de Concreto",
    content: `Simule o impacto de atraso na entrega do concreto:
- Etapa afetada: {etapa}
- Tempo de atraso: {dias_atraso} dias
- Alternativas viáveis: {alternativas}`,
    orientation: "Analisa riscos logísticos de concreteiras locais e plano B."
  },
  {
    id: 100,
    title: "Check-list para Liberação de Etapas",
    content: `Crie um check-list com os critérios mínimos para liberação de:
- Etapa: {etapa}
- Responsável técnico: {responsavel}
- Data prevista: {data}`,
    orientation: "Impede o avanço da obra caso a qualidade do serviço anterior não tenha sido atestada."
  },
  {
    id: 101,
    title: "Comparação de Custo entre Concreto Usinado e Virado",
    content: `Compare o custo total para execução de laje com:
- Volume: {volume} m³
- Preço do concreto usinado: R$ {preco_usinado}/m³
- Preço do concreto virado em obra: R$ {preco_virado}/m³`,
    orientation: "Não esqueça de adicionar a mão de obra intensiva que o concreto virado exige na comparação final."
  },
  {
    id: 102,
    title: "Avaliação Técnica para Substituição de Material",
    content: `Avalie tecnicamente a viabilidade de substituir:
- Material original: {material_original}
- Novo material proposto: {novo_material}
- Motivo da substituição: {motivo}`,
    orientation: "Documenta e resguarda o engenheiro no caso de alteração das diretrizes originais do projeto de arquitetura."
  }
];
