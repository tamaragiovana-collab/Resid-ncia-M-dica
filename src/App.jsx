import React, { useState, useEffect, useMemo, useRef } from "react";

// ============================================================
// DATA — MODULES + PREVALENCE
// ============================================================

const GRANDES_AREAS = ["Clínica Médica", "Clínica Cirúrgica", "Pediatria", "Ginecologia e Obstetrícia", "Preventiva & Social"];

const PREVALENCE_ORDER = [
  "Asma (Questões)", "Câncer Colorretal", "Hérnias Inguinocrurais", "Saúde do Trabalhador",
  "Contracepção (Questões)", "Hemorragia Digestiva Alta", "Cardiopatias Congênitas (Questões)",
  "Código de Ética Médica", "Glomerulopatias (Questões)", "Trauma Torácico", "Pancreatite Aguda",
  "SUS (Questões)", "Síndrome Coronariana Aguda (Questões)", "Choque Hemorrágico", "Sepse e Choque Séptico",
  "PALS", "Abdome Agudo Obstrutivo", "Doença Inflamatória Intestinal", "Bronquiolite", "Queimaduras",
  "Câncer de Estômago", "Apendicite", "Tromboembolismo Pulmonar", "Cirurgia Bariátrica e Metabólica",
  "Artrites (Questões)", "Distúrbios Ácido-Base", "Vigilância Epidemiológica", "Meningites em Crianças",
  "AVC isquêmico (Questões)", "Doenças Exantemáticas (Questões)", "Doença Falciforme", "Diarreia (Questões)",
  "Estudos Epidemiológicos", "Aleitamento Materno", "Trauma Abdominal e Diafragmático",
  "Anemia Ferropriva no Adulto e na Criança", "Calendário Vacinal - Criança & Adulto & Idoso",
  "Colecistite", "Cuidados Paliativos", "Cetoacidose Diabética e Estado Hiperglicêmico Hiperosmolar",
  "Distúrbios do Potássio — Abordagem", "Hipertensão no Adulto", "Climatério e Menopausa",
  "TCE Grave e Herniação Cerebral", "Dengue", "Pré-Eclâmpsia",
  "Infecção de Sítio Cirúrgico e Antibioticoprofilaxia", "Hiponatremia", "Testes Diagnósticos",
  "Febre Reumática", "ITU na Criança", "Hiperplasia Adrenal Congênita", "Pneumonia na Criança",
  "Adaptações & Queixas da Gestação", "Melanoma", "Nutrição Perioperatória",
  "Pneumonia Adquirida na Comunidade", "Doença Renal Crônica", "Parasitoses (Questões)",
  "Distúrbios do Cortisol (Questões)", "Ventilação Mecânica", "Derrame Pleural",
  "Taquiarritmias (Questões)", "Dislipidemia", "Incontinência Urinária", "Alergia Alimentar",
  "Neoplasias Pediátricas", "Leucemias (questões)", "Cicatrização de Feridas",
  "DPOC – Diagnóstico e Tratamento", "Reanimação Neonatal", "Injúria Renal Aguda",
  "Gestação Ectópica", "Insuficiência Cardíaca – Ambulatorial", "Declaração de Óbito",
  "Endometriose", "Cefaleias (Questões)", "Endocardite Infecciosa", "Avaliação do DNPM",
  "Imobilização Cervical e Via Aérea no Trauma", "Atributos da APS", "HIV (Questões)",
  "Avaliação Pôndero-Estatural", "Fisiologia Menstrual", "Tumores Neuroendócrinos",
  "Diabetes Mellitus Gestacional", "Câncer de Mama", "Hiperplasia e Câncer de Endométrio",
  "Políticas e Protocolos", "Política Nacional de Atenção Básica", "Doença do Refluxo Gastroesofágico",
  "Infertilidade - Tratamento", "Cardiotocografia", "Trauma Esplênico", "Testes de Triagem Neonatal",
  "Vasculite por IgA", "Diverticulite", "Síndrome dos Ovários Policísticos", "Nódulos Tireoidianos",
  "Megaesôfago & Megacólon Chagásico", "Câncer de Pulmão", "Doenças Túbulo-Intersticiais (Questões)",
  "Hipertireoidismo", "Carcinoma Hepatocelular", "Câncer de Esôfago", "Prolapso de Órgãos Pélvicos",
  "REMIT", "Nefrolitíase", "Abdome Agudo Perfurativo", "Avaliação da Amenorreia Primária",
  "DM 2 - Tratamento sem Insulina", "Distúrbios do Cálcio", "Abuso Infantil",
  "Prevenção e Promoção da Saúde", "Divertículo de Meckel", "Transtorno do Espectro Autista (TEA)",
  "Aloimunização Rh", "Abdome Agudo Vascular", "Ascite", "Doenças Desmielinizantes (Questões)",
  "Hemorragia Pós-Parto", "Avaliação Inicial no Trauma", "Câncer de Tireoide", "COVID-19",
  "Cardiomiopatias", "Rastreio do Câncer de Colo", "Câncer de Ovário", "Infecção do Trato Urinário",
  "Anafilaxia", "Fibrilação Atrial", "Meningites", "Leishmaniose", "Fibrose Cística",
  "Anestesia Local", "Lúpus Eritematoso Sistêmico", "Icterícia Neonatal (Questões)",
  "Doença Hemorroidária", "Hepatite B", "Hipertensão Arterial Sistêmica na Criança",
  "Infecções de Pele e Partes Moles (Questões)", "Diálise", "Lesões Benignas da Mama",
  "Emergências Oncológicas (Questões)", "Avaliação das Doenças Pulmonares Intersticiais",
  "Coledocolitíase", "Farmacodermias (Questões)", "Hemorragia Digestiva Baixa",
  "Sífilis na Gestação", "Assistência Pré-Natal", "Trauma na Criança",
  "Anemias Hemolíticas (Questões)", "Intussuscepção Intestinal", "Púrpura Trombocitopênica Imune (PTI)",
  "Trabalho de Parto Prematuro", "Mieloma Múltiplo", "Hipertensão Pulmonar", "Leiomioma",
  "Trauma Cervical", "Câncer de Cabeça e Pescoço", "Divertículos Esofágicos",
  "Tumores Císticos do Pâncreas", "Complicações Crônicas do DM (Questões)", "Trombose Venosa Profunda",
  "Manejo de Intoxicações (Questões)", "Gestação Múltipla", "Hipertensão Portal",
  "Câncer de Próstata", "Convulsão Febril", "Vitaminas & Minerais na Puericultura",
  "Descolamento Prematuro de Placenta", "Sífilis", "Neoplasias da Via Biliar (Questões)",
  "Artrite Reumatoide", "Câncer de Pâncreas Exócrino", "Aneurismas de Aorta Abdominal",
  "Hipotireoidismo", "Insuficiência Cardíaca – Descompensação", "Medidas de Associação",
  "Partograma", "Lúpus Eritematoso Sistêmico Juvenil", "Placenta Prévia", "Trauma Pélvico",
  "Trauma de Uretra & Bexiga & Ureter", "Método Clínico Centrado na Pessoa", "ACLS",
  "Epilepsia e Crises Epilépticas e Estado de Mal", "Linfomas", "Estática Fetal", "Distócias",
  "Doença Trofoblástica Gestacional", "Trauma de Extremidades", "Colangite Aguda",
  "Doença Inflamatória Pélvica", "Dermatite Atópica", "DPOC – Exacerbações",
  "Fístulas do Trato Gastrointestinal", "Doença Celíaca", "Sífilis Congênita", "Bioestatística",
  "Transtorno do Déficit de Atenção e Hiperatividade", "Assistência ao Trabalho de Parto",
  "Tuberculose Miliar e Extrapulmonar", "Colecistectomia e Lesões da Via Biliar",
  "Anemia Megaloblástica", "Criptorquidia", "Síndrome Hemolítico-Urêmica", "Osteoporose",
  "Toxoplasmose na Gestação", "Rastreio do Câncer de Mama", "Miastenia Gravis",
  "Obesidade e Síndrome Metabólica", "Displasia do Desenvolvimento do Quadril",
  "Doença Hepática Esteatótica Associada à Disfunção Metabólica", "Reações Transfusionais (Questões)",
  "Doença de Kawasaki", "Doença de Parkinson", "Antibióticos (Questões)", "Úlcera Péptica",
  "Cuidados de Sala de Parto & Alojamento Conjunto", "Sarampo", "Abscesso e Fístula Anorretal",
  "Hanseníase", "Rotura Prematura de Membranas Ovulares", "Restrição de Crescimento Intrauterino",
  "Fórceps", "Tumores Hepáticos Benignos", "Síndrome de Guillain-Barré", "Espondiloartrites",
  "Estenose Hipertrófica de Piloro", "Pneumotórax", "Mão-Pé-Boca & Herpangina",
  "Dissecção de Aorta e Outras Síndromes Aórticas", "Síndrome Coronariana Crônica",
  "Pericardite Aguda", "Hepatite C", "Faringite Aguda", "Cirrose", "Vacinas da Gestante",
  "Fios & Suturas", "Cirurgia Minimamente Invasiva", "Abortamento", "Avaliação de SUA",
  "Vaginose Bacteriana", "Tireoidectomia", "Refluxo Gastroesofágico na Criança",
  "Anticoagulação e sua Reversão", "Delirium", "Nefrite Lúpica", "Alterações da Puberdade",
  "Avaliação Pré-Operatória", "Álcool", "Trauma Hepático", "Trauma Renal", "Hiperprolactinemia",
  "Fibromialgia", "Desconforto respiratório do RN (Questões)", "Bradiarritmias (Questões)",
  "Doença Arterial Obstrutiva Periférica", "Acidentes Ofídicos", "Puberdade Fisiológica",
  "Segurança da Criança", "AIDS e Profilaxias de Oportunistas", "Peritonite Bacteriana Espontânea",
  "Dopplervelocitometria e Perfil Biofísico Fetal", "Conceitos em Pesquisa Clínica",
  "Câncer de Testículo", "Indução do Parto", "Diagnóstico & Datação da Gestação",
  "Infecções Puerperais", "Trauma Vertebral e Raquimedular", "Síndrome de Down",
  "Rastreamento de Cromossomopatias (Questões)", "Granulomatose com Poliangeíte & Poliangeíte Microscópica",
  "Colelitíase e Colecistolitíase", "Avaliação da Amenorreia Secundária", "Sarcoidose", "Dispepsia",
  "Oclusão Arterial Aguda", "Mordedura de Animais", "Idoso Frágil & Polifarmácia",
  "Doenças Clínicas na Gestação", "Síndrome Gripal & SRAG", "ITU na Gestação",
  "Síndrome Hepatorrenal", "Torcicolo Congênito", "Adenomiose",
  "Infecção de Corrente Sanguínea associada à Cateter", "Trauma Gastrointestinal", "Priapismo",
  "Arterite de Células Gigantes", "Abordagem Familiar e Comunitária", "Sarcomas",
  "Hipertensão — Urgências e Emergências", "Hiperaldosteronismo Primário", "Incidentaloma Adrenal",
  "HIV na Gestação", "Síncope", "Distúrbios do Sono", "Apneia Obstrutiva do Sono",
  "Avaliação do Paciente com Demência", "Doença Hirschsprung", "Sepse Neonatal",
  "DM 2 - Insulina", "Corpo Estranho na Pediatria", "Fissura Anal", "Câncer Anal",
  "Hipertensão Arterial Sistêmica Secundária (Questões)", "Otite Média Aguda em Crianças",
  "Coqueluche", "Bronquiectasia", "Suicídio", "Artrite Idiopática Juvenil", "Doença de Alzheimer",
  "Tuberculose na Criança", "Afecções Testiculares", "Avaliação da Vertigem", "Tricomoníase",
  "Atresia de Esôfago e Fístulas Traqueoesofágicas", "Esclerose Sistêmica", "Doença de Sjögren",
  "Distúrbios Metabólicos do RN (Questões)", "Síndrome do Intestino Irritável",
  "Pancreatite Crônica", "Hemofilia", "Síndrome Colinérgica & Intoxicação por Carbamatos/Organofosforados",
  "Hepatite Alcoólica", "Eclâmpsia", "Febre Sem Sinais Localizatórios & de Origem Indeterminada",
  "Câncer de Bexiga", "Neoplasias da Vulva", "Tabagismo", "Antidepressivos e Ansiolíticos",
  "Antipsicóticos e Antiepilépticos e Estabilizadores do Humor", "Demência Frontotemporal",
  "Cirurgia de Controle de Danos", "Hiperplasia Prostática Benigna",
  "Cervicite & Uretrite & Epididimite & Proctite", "Urticária", "Dermatomiosite e Polimiosite",
  "Deiscência de Anastomose Duodenal", "DM 2 - Clínica e Diagnóstico", "Constipação",
  "Síndrome do Anticorpo Antifosfolípide", "Doença de von Willebrand", "Insuficiência Venosa Crônica",
  "Intoxicação por Paracetamol", "Hepatite A", "Síndrome HELLP", "Hipotireoidismo Subclínico",
  "Síndrome do Desconforto Respiratório Agudo", "Outras Infecções na Gestação", "Febre Maculosa",
  "Morte Encefálica", "Mielopatias", "Outras Gamopatias Monoclonais", "Doença de Osgood-Schlatter",
  "Transplante Hepático", "Herpes-Zóster", "Acesso Venoso Central", "Pneumonia Associada ao Ventilador",
  "Anemia da Doença Crônica", "Talassemias", "Chikungunya", "Carcinoma Basocelular", "H. pylori",
  "Malformações de Vias Urinárias", "Massas Mediastinais (Questões)", "Hipoglicemia",
  "Profilaxia do Tétano", "Toxoplasmose Congênita", "Crupe", "Malária", "Policitemia Vera",
  "Colangite Biliar Primária", "Varíola", "Mpox", "Ostomias", "Transtornos Depressivos",
  "Pólipo Uterino", "Trauma Retroperitoneal", "Erros Inatos do Metabolismo", "Vacinas do HPV",
  "Candidíase Vaginal", "Enxertos e Retalhos", "Úlceras Por Pressão",
  "Síndrome Compartimental Abdominal", "Febre e Atelectasia no Pós-Operatório",
  "Alterações Cutâneas do RN", "Taquipneia Transitória do RN", "Diabetes Mellitus Tipo 1",
  "Púrpura Trombocitopênica Trombótica (PTT)", "Distúrbios da Vitamina D", "Valvopatias (Questões)",
  "Síndrome Compartimental", "Doenças da Tireoide na Gestação", "Insuficiência Istmo-Cervical",
  "Leptospirose", "Paracoccidioidomicose", "Tumores Renais", "Esclerose Lateral Amiotrófica",
  "Dermatoses da Vulva", "Síndromes Mielodisplásicas", "Distúrbios da Audição",
  "Hemocromatose Hereditária", "Cesárea", "Complicações da Prematuridade",
  "Hidrocefalia de Pressão Normal", "Políticas de Saúde Mental",
  "Coagulação Intravascular Disseminada (CIVD)", "Trombofilia", "Hipernatremia", "Varicela",
  "Exantema Súbito", "Estenose de Carótidas", "Acidente Escorpiônico", "Distúrbios do GH",
  "Insuficiência Hepática Aguda", "Abscesso Hepático", "Paralisia de Bell",
  "Colangite Esclerosante Primária", "Fases do Trabalho de Parto", "Parto Pélvico",
  "Displasia Broncopulmonar", "Êmese e Hiperêmese Gravídica", "Trauma na Gestante",
  "Trauma de Face", "Pentavalente e DTP", "Tríplice Viral & Varicela & Herpes-Zóster",
  "Vaginose Citolítica", "Rinite Alérgica", "Febre Amarela", "Projeto Terapêutico Singular",
  "AVC hemorrágico (Questões)", "Nódulos Cervicais (Questões)", "Atresia Intestinal",
  "Distúrbios do Magnésio", "Parvovírus B19 & Eritema Infeccioso", "Epidemiologia Brasileira (Questões)",
  "Síndrome da Embolia Gordurosa", "Outras Hérnias", "Hipopituitarismo", "Hipoxemia",
  "Mononucleose & Epstein Barr", "Encefalite Herpética", "Paralisia Cerebral",
  "Massas Anexiais Benignas", "Lombalgia", "Radiculopatias", "Osteomielite em Adultos",
  "Enterocolite Necrosante", "Esquizofrenia & Psicose", "Rotura Uterina", "Dismenorreia",
  "Vacinas do Pneumococo & Meningococo", "Porfirias", "Carcinoma Espinocelular", "Disfagia",
  "Gastrosquise e Onfalocele", "Polimialgia Reumática", "Seroma & Hematoma & Deiscência",
  "Eritema Nodoso", "Dermatoses Parasitárias (Questões)", "Síndrome do Desconforto Respiratório do RN",
  "Rubéola", "Miocardite", "Endemia & Epidemia & Pandemia", "Intoxicação por Opioides",
  "Rinossinusite em Crianças", "Encefalopatia Hepática", "Transplante Renal", "Corioamnionite",
  "Pós-Datismo", "Óbito Fetal", "Aspergilose Invasiva", "Câncer de Colo Invasivo",
  "Doença de Wilson", "Direitos da Gestante", "Protocolo de Cirurgia Segura",
  "Transtornos Alimentares", "Violência Sexual e Aborto Induzido", "Afogamento",
  "Vulvovaginites em Crianças", "Sequência Rápida de Intubação", "Dermatite de Fralda",
  "Escarlatina", "Saúde Coletiva", "Intoxicação por Benzodiazepínicos", "Hérnias da Infância",
  "Infecção pelo Zika Vírus Congênita", "Doença de Chagas", "Tumores Ósseos Benignos",
  "Epistaxe", "Febre Tifoide", "Tétano", "Tosse Crônica", "Profilaxia de Estrepto B",
  "Fármacos na Gestação", "Enurese Noturna", "Modificações Fisiológicas do Puerpério",
  "Síndrome PFAPA", "Segurança do Profissional da Saúde", "Demência por Corpúsculos de Lewy",
  "Choque Elétrico", "Hipotireoidismo Congênito", "Vacina do Rotavírus", "Doença Diverticular",
  "Síndrome Pré-Menstrual", "Zika", "Malformações Anorretais", "Traqueomalácia",
  "Doença Relacionada ao IgG4", "Classificação do Recém-Nascido", "Psoríase", "Pênfigo",
  "Asfixia Perinatal", "Acidentes com Aracnídeos", "Síndrome Adrenérgica",
  "Síndrome Anticolinérgica", "Atendimento ao Idoso Vítima de Violência", "Hepatite Autoimune",
  "Toxoplasmose no Adulto", "Difteria", "Hantavirose", "Amiloidose", "Esporotricose", "Glaucoma",
  "Metabolismo da Bilirrubina e Icterícias não-obstrutivas", "Raiva Humana",
  "Transtornos de Ansiedade", "Transtorno Afetivo Bipolar", "Vasa Prévia", "Tremor Essencial",
  "Trauma no Idoso", "Poliarterite Nodosa", "Behçet e Tromboangeíte Obliterante (Questões)",
  "Sistema Imune", "Síndrome de Turner", "Esofagites", "Malformações Broncopulmonares",
  "Fimose e Parafimose", "Hipospádia e Fimose (Questões)", "Dermatite de Contato", "Acne",
  "Pitiríase Versicolor", "Dermatoses Virais (Questões)", "Hipertensão Pulmonar Persistente do RN",
  "Diabetes Monogênico", "Intoxicação por Lítio", "Infecção pelo Citomegalovírus Congênita",
  "Poliomielite", "Câncer de Pênis", "BRUE", "Abrasão Corneana e Corpo Estranho", "Catarata",
  "Doenças da Pálpebra", "Osteogênese Imperfeita", "Transtornos de Personalidade",
  "Transtornos Somáticos", "Infecção por C. difficile", "Demência Vascular", "Demências Infecciosas",
  "Discinesia Ciliar Primária", "Tuberculose Pulmonar (Questões)", "Vacinas das Hepatites",
  "Cisto & Abscesso da Glândula de Bartholin",
];

const RAW_MODULES = [
  { name: "Abdome Agudo", area: "Clínica Cirúrgica", topics: ["Apendicite","Doença Diverticular","Diverticulite","Pancreatite Aguda","Abdome Agudo Obstrutivo","Abdome Agudo Perfurativo","Abdome Agudo Vascular","Abdome Agudo - Radiografia (Multimídia)","Abdome Agudo - Tomografia (Multimídia)"] },
  { name: "Alergologia", area: "Clínica Médica", topics: ["Hipersensibilidade","Sistema Imune","Rinite Alérgica","Urticária","Anafilaxia","Alergia Alimentar","Dermatite Atópica"] },
  { name: "Amenorreia Primária", area: "Ginecologia e Obstetrícia", topics: ["Fisiologia Menstrual","Ginecologia Endócrina (Multimídia)","Deficiência Isolada de GnRH","Anomalias Uterovaginais","Avaliação da Amenorreia Primária","Síndrome de Turner","Síndrome Pré-Menstrual","Deficiências Androgênicas e Endocrinopatias"] },
  { name: "Amenorreia Secundária", area: "Ginecologia e Obstetrícia", topics: ["Aderências Intrauterinas","Insuficiência Ovariana Primária","Avaliação da Amenorreia Secundária","Amenorreia Hipotalâmica Funcional","Síndrome dos Ovários Policísticos","Hiperprolactinemia"] },
  { name: "Anemias Carenciais", area: "Clínica Médica", topics: ["Conceitos Gerais de Anemia","Anemia Ferropriva no Adulto e na Criança","Anemia da Doença Crônica","Anemia Megaloblástica"] },
  { name: "Anemias Hemolíticas", area: "Clínica Médica", topics: ["Anemia Sideroblástica","Anemias Autoimunes","Esferocitose Hereditária","Deficiência de G6PD","Introdução às Hemoglobinopatias","Talassemias","Doença Falciforme","Interpretação do Hemograma (Multimídia)","Esfregaço de Sangue Periférico (Multimídia)","Porfirias","Hemoglobinúria Paroxística Noturna","Anemias Hemolíticas (Questões)"] },
  { name: "Anestesiologia", area: "Clínica Cirúrgica", topics: ["Anestesia Geral","Anestesia Neuroaxial","Anestesia Local","Sequência Rápida de Intubação","Avaliação das Vias Aéreas (Multimídia)"] },
  { name: "Antibióticos", area: "Clínica Médica", topics: ["Carbapenêmicos e Monobactâmicos","Cefalosporinas","Lincosamidas","Macrolídeos","Penicilinas","Antibióticos (Questões)"] },
  { name: "Arboviroses", area: "Clínica Médica", topics: ["Dengue","Chikungunya","Zika","Febre Amarela","Febre Oropouche","Febre do Mayaro"] },
  { name: "Artrites", area: "Clínica Médica", topics: ["Artrite Reumatoide","Espondiloartrites","Artrite Psoriásica","Osteoartrite","Artrite Séptica","Gota","Artrites (Questões)"] },
  { name: "Asma & DPOC", area: "Clínica Médica", topics: ["Manejo Ambulatorial da Asma","Exacerbação da Asma","Asma (Questões)","DPOC – Definição e Fisiopatologia","DPOC – Diagnóstico e Tratamento","DPOC – Exacerbações","Espirometria (Multimídia)","Aspergilose Broncopulmonar Alérgica"] },
  { name: "Atenção Primária", area: "Preventiva & Social", topics: ["Prevenção e Promoção da Saúde","Atributos da APS","Projeto Terapêutico Singular","Política Nacional de Atenção Básica","Abordagem Familiar e Comunitária","Método Clínico Centrado na Pessoa"] },
  { name: "AVC", area: "Clínica Médica", topics: ["AVC — Epidemiologia e Patogênese","AVC isquêmico (Questões)","AVC — Escalas e Neuroimagem","Manejo do AVC isquêmico","Hemorragia Subaracnoide","Hemorragia Intraventricular e Intracerebral","AVC hemorrágico (Questões)"] },
  { name: "Cabeça e Pescoço", area: "Clínica Cirúrgica", topics: ["Nódulos Tireoidianos","Câncer de Tireoide","Tireoidectomia","Nódulos Cervicais","Nódulos Cervicais (Questões)","Câncer de Cabeça e Pescoço"] },
  { name: "Câncer de Pele", area: "Clínica Médica", topics: ["Carcinoma Basocelular","Carcinoma Espinocelular","Melanoma"] },
  { name: "Cefaleias e Algias Cranianas", area: "Clínica Médica", topics: ["Cefaleia do Tipo Tensão","Cefaleias - Migrânea","Cefaleias - Trigêmino-Autonômicas","Cefaleias (Questões)","Cefaleia Cervicogênica","Cefaleia Hípnica","Cefaleia por uso Excessivo de Medicamentos","Neuralgia do Trigêmeo","Síndrome de Vasoconstrição Cerebral Reversível","Hipertensão Intracraniana Idiopática","Síndrome de Encefalopatia Posterior Reversível (PRES)"] },
  { name: "Cirurgia do Aparelho Digestivo - Esôfago", area: "Clínica Cirúrgica", topics: ["Esôfago de Barrett","Esofagites","Disfagia","Acalásia","Megaesôfago & Megacólon Chagásico","Esofagograma (Multimídia)","Divertículos Esofágicos","Câncer de Esôfago","Endoscopia Digestiva Alta (Multimídia)"] },
  { name: "Cirurgia do Aparelho Digestivo - Estômago", area: "Clínica Cirúrgica", topics: ["Doença do Refluxo Gastroesofágico","Refluxo Gastroesofágico na Criança","H. pylori","Câncer de Estômago","Úlcera Péptica","Inibidores da Bomba de Prótons"] },
  { name: "Cirurgia do Aparelho Digestivo - Pâncreas & Cólon", area: "Clínica Cirúrgica", topics: ["Câncer Colorretal","Câncer de Pâncreas Exócrino","Tumores Císticos do Pâncreas","Tumores Neuroendócrinos","Oncologia do Aparelho Digestivo – Exames de Imagem (Multimídia)"] },
  { name: "Cirurgia Pediátrica - Gastrointestinal", area: "Pediatria", topics: ["Divertículo de Meckel","Intussuscepção Intestinal","Neoplasias Pediátricas","Estenose Hipertrófica de Piloro","Gastrosquise e Onfalocele","Atresia Intestinal","Atresia de Esôfago e Fístulas Traqueoesofágicas","Malformações Anorretais","Doença Hirschsprung"] },
  { name: "Cirurgia Pediátrica - Torácica", area: "Pediatria", topics: ["Cardiopatias Congênitas Acianóticas","Cardiopatias Congênitas Cianóticas","Cardiopatias Congênitas (Questões)","Malformações Broncopulmonares","Hérnia Diafragmática Congênita"] },
  { name: "Cirurgia Pediátrica - Urológica", area: "Pediatria", topics: ["Criptorquidia","Hipospádia","Fimose e Parafimose","Hipospádia e Fimose (Questões)","Malformações de Vias Urinárias"] },
  { name: "Cirurgia Plástica", area: "Clínica Cirúrgica", topics: ["Enxertos e Retalhos","Úlceras Por Pressão","Avaliação de Feridas & Cicatrizes (Multimídia)"] },
  { name: "Cirurgia Torácica", area: "Clínica Cirúrgica", topics: ["Pneumotórax","Traqueomalácia","Câncer de Pulmão","Ultrassonografia Pulmonar (Multimídia)","Tomografia de Tórax (Multimídia)","Derrame Pleural","Massas Mediastinais (Questões)"] },
  { name: "Colagenoses", area: "Clínica Médica", topics: ["Lúpus Eritematoso Sistêmico","Esclerose Sistêmica","Doença de Sjögren","Dermatomiosite e Polimiosite","Polimialgia Reumática","Sarcoidose","Fibromialgia","Doença Mista do Tecido Conjuntivo","Doença Relacionada ao IgG4","Manifestações Reumatológicas (Multimídia)"] },
  { name: "Complicações Agudas do Diabetes Mellitus", area: "Clínica Médica", topics: ["Cetoacidose Diabética e Estado Hiperglicêmico Hiperosmolar","Hipoglicemia"] },
  { name: "Complicações Cirúrgicas", area: "Clínica Cirúrgica", topics: ["Infecção de Sítio Cirúrgico e Antibioticoprofilaxia","Deiscência de Anastomose Duodenal","Seroma & Hematoma & Deiscência","Síndrome Compartimental Abdominal","Febre e Atelectasia no Pós-Operatório","Fístulas do Trato Gastrointestinal"] },
  { name: "Complicações Crônicas do Diabetes Mellitus", area: "Clínica Médica", topics: ["Neuropatia Diabética","Retinopatia Diabética","Doença Renal Diabética","Pé Diabético","Complicações Crônicas do DM (Questões)"] },
  { name: "Contracepção & Infertilidade", area: "Ginecologia e Obstetrícia", topics: ["Conceitos Gerais de Contracepção","Métodos Definitivos","Métodos Intrauterinos","Métodos de Barreira","Métodos Naturais","Métodos Hormonais","Contracepção (Questões)","Infertilidade - Avaliação","Infertilidade - Tratamento"] },
  { name: "Cuidados Pós-Natais", area: "Pediatria", topics: ["Classificação do Recém-Nascido","Reanimação Neonatal","Cuidados de Sala de Parto & Alojamento Conjunto","Hiperbilirrubinemia Indireta Neonatal","Colestase Neonatal","Icterícia Neonatal (Questões)","Hipoglicemia Neonatal","Hipocalcemia Neonatal","Distúrbios Metabólicos do RN (Questões)","Alterações Cutâneas do RN","Sepse Neonatal","Infecções por Clamídia no Recém-Nascido","Semiologia Pediátrica (Multimídia)"] },
  { name: "Dermatologia", area: "Clínica Médica", topics: ["Psoríase","Dermatite de Fralda","Dermatite de Contato","Eritema Nodoso","Sarcomas","Pênfigo","Acne","Hidradenite Supurativa","Lesões por Psoríase (Multimídia)","Alterações Ungueais (Multimídia)","Lesões Elementares (Multimídia)","Semiologia das Extremidades (Multimídia)","Neurofibromatose"] },
  { name: "Dermatoses Infecciosas", area: "Clínica Médica", topics: ["Larva Migrans","Pediculose","Tungíase","Escabiose","Dermatoses Parasitárias (Questões)","Dermatofitoses (Tínea)","Pitiríase Versicolor","Dermatoses Fúngicas (Questões)","Lesões por Parasitas e Fungos (Multimídia)","Molusco Contagioso","Lesões por HPV","Orf Humano","Síndrome de Gianotti-Crosti","Dermatoses Virais (Questões)","Lesões por Vírus (Multimídia)","Lesões por Bactérias (Multimídia)","Lesões Orais (Multimídia)"] },
  { name: "Desconforto Respiratório do RN", area: "Pediatria", topics: ["Síndrome da Aspiração de Mecônio","Hipertensão Pulmonar Persistente do RN","Taquipneia Transitória do RN","Síndrome do Desconforto Respiratório do RN","Asfixia Perinatal","Pneumonia Neonatal","Desconforto respiratório do RN (Questões)"] },
  { name: "Diabetes Mellitus Tipo 1", area: "Clínica Médica", topics: ["Diabetes Mellitus Tipo 1","Diabetes Monogênico"] },
  { name: "Diabetes Mellitus Tipo 2", area: "Clínica Médica", topics: ["DM 2 - Clínica e Diagnóstico","DM 2 - Tratamento sem Insulina","DM 2 - Insulina"] },
  { name: "Diarreia & Constipação & Dor Abdominal", area: "Clínica Médica", topics: ["Diarreia Aguda - Fisiopatologia","Diarreia Aguda - Abordagem","Diarreia (Questões)","Doença Inflamatória Intestinal","Constipação","Doença Celíaca","Síndrome do Intestino Irritável","Gastroparesia","SIBO","Pancreatite Crônica","Dispepsia","Semiologia Abdominal (Multimídia)"] },
  { name: "Distúrbios da Hemostasia", area: "Clínica Médica", topics: ["Púrpura Trombocitopênica Trombótica (PTT)","Púrpura Trombocitopênica Imune (PTI)","Coagulação Intravascular Disseminada (CIVD)","Trombofilia","Síndrome do Anticorpo Antifosfolípide","Hemofilia","Anticoagulação e sua Reversão","Doença de von Willebrand","Síndrome Hemolítico-Urêmica"] },
  { name: "Distúrbios do Ritmo", area: "Clínica Médica", topics: ["ACLS","BLS","PALS","Fibrilação Atrial","Bloqueio Atrioventricular","Taquiarritmias (Questões)","Flutter Atrial","Taquicardia por Reentrada Atrioventricular","Taquicardia por Reentrada Nodal","Taquicardia Ventricular Monomórfica","Bradiarritmias (Questões)","ECG Avançado (Multimídia)"] },
  { name: "Distúrbios Hidroeletrolíticos & Ácido-Base", area: "Clínica Médica", topics: ["Distúrbios do Potássio — Fisiopatologia","Hiponatremia","Hipernatremia","Distúrbios do Potássio — Abordagem","Distúrbios Ácido-Base"] },
  { name: "Doenças do Metabolismo Ósseo", area: "Clínica Médica", topics: ["Distúrbios da Vitamina D","Distúrbios do Magnésio","Hiperparatireoidismo Primário","Osteoporose","Distúrbios do Cálcio"] },
  { name: "Doenças Exantemáticas", area: "Pediatria", topics: ["Sarampo","Rubéola","Varicela","Parvovírus B19 & Eritema Infeccioso","Exantema Súbito","Mão-Pé-Boca & Herpangina","Escarlatina","Doenças Exantemáticas (Multimídia)","Doenças Exantemáticas (Questões)"] },
  { name: "Doenças Valvares", area: "Clínica Médica", topics: ["Febre Reumática","Endocardite Infecciosa","Insuficiência Aórtica","Estenose Aórtica","Estenose Mitral","Insuficiência Mitral","Valvopatias Tricúspides e Pulmonares","Valvopatias (Questões)","Fonocardiograma (Multimídia)","Semiologia Cardiovascular (Multimídia)"] },
  { name: "Doenças Vasculares", area: "Clínica Cirúrgica", topics: ["Trombose Venosa Profunda","Insuficiência Venosa Crônica","Oclusão Arterial Aguda","Semiologia Vascular (Multimídia)","Doença Arterial Obstrutiva Periférica","Dissecção de Aorta e Outras Síndromes Aórticas","Aneurismas de Aorta Abdominal","Ultrassonografia Vascular (Multimídia)","Estenose de Carótidas"] },
  { name: "Dor Torácica", area: "Clínica Médica", topics: ["Síndrome Coronariana Aguda – Fisiopatologia & Diagnóstico","Síndrome Coronariana Aguda – Terapia de Reperfusão","Síndrome Coronariana Aguda – Princípios do Tratamento","Síndrome Coronariana Aguda (Questões)","Síndrome Coronariana Crônica","Angiografia Coronária (Multimídia)","Oclusão Coronariana Aguda (Multimídia)","Pericardite Aguda","Miocardite","ECG Intermediário (Multimídia)"] },
  { name: "Epidemiologia", area: "Preventiva & Social", topics: ["Vigilância Epidemiológica","Saúde Coletiva","Transição Demográfica e Epidemiológica","Endemia & Epidemia & Pandemia","Epidemiologia (Multimídia)","Epidemiologia Brasileira (Questões)"] },
  { name: "Exposições Ambientais", area: "Clínica Médica", topics: ["Corpo Estranho na Pediatria","Mordedura de Animais","Acidentes Ofídicos","Acidentes com Aracnídeos","Acidente Escorpiônico","Síndrome Serotoninérgica","Síndrome Adrenérgica","Síndrome Colinérgica & Intoxicação por Carbamatos/Organofosforados","Intoxicação por Benzodiazepínicos","Síndrome Anticolinérgica","Intoxicação por Paracetamol","Intoxicação por Opioides","Intoxicação por Lítio","Manejo de Intoxicações (Questões)"] },
  { name: "Farmacodermias", area: "Clínica Médica", topics: ["Síndrome de Stevens-Johnson e NET","Síndrome DRESS","Eritema Multiforme","Farmacodermias (Questões)"] },
  { name: "Fraturas", area: "Clínica Cirúrgica", topics: ["Profilaxia do Tétano","Conceitos Gerais de Fraturas","Fraturas Expostas","Fraturas de Quadril","Fraturas de Antebraço","Fraturas de Dedo & Mão & Punho","Fraturas de Tornozelo","Fraturas de Tíbia","Fraturas de Úmero","Síndrome da Embolia Gordurosa","Síndrome Compartimental","Fraturas em Crianças (Multimídia)"] },
  { name: "Geriatria", area: "Clínica Médica", topics: ["Manejo Paliativo de Sintomas","Cuidados Paliativos","Delirium","Idoso Frágil & Polifarmácia","Atendimento ao Idoso Vítima de Violência"] },
  { name: "Glomerulopatias & Tubulopatias", area: "Clínica Médica", topics: ["Síndrome Nefrótica","Síndrome Nefrótica na Pediatria","Nefropatia por IgA","Nefropatia Membranosa","Glomerulonefrite Membranoproliferativa","Glomerulonefrite Rapidamente Progressiva (GNRP)","Glomeruloesclerose Segmentar e Focal (GESF)","Doença de Lesões Mínimas","Síndrome Nefrítica","Glomerulonefrite Pós-Estreptocóccica (GNPE)","Nefrite Intersiticial Aguda","Tubulopatias","Doenças Túbulo-Intersticiais (Questões)","Nefrite Lúpica","Nefropatia associada ao HIV","Doença da Membrana Fina","Síndrome de Alport","Nefroesclerose Hipertensiva","Urinálise","Glomerulopatias (Questões)"] },
  { name: "Hebiatria", area: "Pediatria", topics: ["Puberdade Fisiológica","Atendimento a Adolescentes","Segurança da Criança","Alterações da Puberdade"] },
  { name: "Hemorragia Digestiva & Doenças Anorificiais", area: "Clínica Cirúrgica", topics: ["Hemorragia Digestiva Alta","Hemorragia Digestiva Baixa","Doença Hemorroidária","Abscesso e Fístula Anorretal","Fissura Anal","Câncer Anal","Coloproctologia (Multimídia)"] },
  { name: "Hepatites", area: "Clínica Médica", topics: ["Hepatite C","Hepatite B","Hepatite A","Lesão Hepática Induzida por Drogas","Hepatite Autoimune","Hepatite Alcoólica"] },
  { name: "Hérnias", area: "Clínica Cirúrgica", topics: ["Hérnias Inguinocrurais","Outras Hérnias","Hérnias da Infância","Laparoscopia de Hérnias Inguinocrurais (Multimídia)"] },
  { name: "Hipertensão Arterial Sistêmica & Dislipidemia", area: "Clínica Médica", topics: ["Hipertensão no Adulto","Hipertensão — Urgências e Emergências","Hipertensão Renovascular","Hiperaldosteronismo Primário","Feocromocitoma & Paraganglioma","Hipertensão Arterial Sistêmica Secundária (Questões)","Hipertensão Arterial Sistêmica na Criança","Dislipidemia"] },
  { name: "Hipertensão & Diabetes & Outras Doenças na Gestação", area: "Ginecologia e Obstetrícia", topics: ["Síndrome HELLP","Pré-Eclâmpsia","Eclâmpsia","Hipertensão Gestacional","Diabetes Mellitus Gestacional","Gestação Múltipla","Doenças Clínicas na Gestação","Doenças da Tireoide na Gestação","Insuficiência Istmo-Cervical"] },
  { name: "Hipófise & Tireoide & Adrenal", area: "Clínica Médica", topics: ["Insuficiência Adrenal","Incidentaloma Adrenal","Síndrome de Cushing","Hipopituitarismo","Distúrbios do GH","Hipertireoidismo","Hipotireoidismo Subclínico","Hipotireoidismo","Tireoidopatias (Multimídia)","Distúrbios do Cortisol (Questões)"] },
  { name: "Hipoxemia", area: "Clínica Médica", topics: ["Síndrome do Desconforto Respiratório Agudo","Hipoxemia","Ventilação Mecânica","Tromboembolismo Pulmonar"] },
  { name: "HIV e Infecções Oportunistas", area: "Clínica Médica", topics: ["HIV — Clínica & Diagnóstico","HIV — Manejo","HIV — PEP e PrEP","HIV-TB e Reconstituição Imune","AIDS e Profilaxias de Oportunistas","Pneumocistose","Criptococose","Infecção pelo CMV","Sarcoma de Kaposi","Histoplasmose","Candidíase","Toxoplasmose no Adulto","HIV (Questões)"] },
  { name: "Infecções Congênitas", area: "Pediatria", topics: ["Toxoplasmose Congênita","Infecção pelo Citomegalovírus Congênita","Infecção pelo Zika Vírus Congênita","Rubéola Congênita","Sífilis Congênita","Infecções Congênitas (Multimídia)"] },
  { name: "Infecções de Pele e Partes Moles", area: "Clínica Médica", topics: ["Celulite e Erisipela","Impetigo","Infecção Necrotizante de Tecidos Moles","Úlcera de Buruli","Doença Pilonidal","Gangrena Gasosa","Infecções de Pele e Partes Moles (Questões)"] },
  { name: "Infecções de Vias Aéreas Superiores", area: "Clínica Médica", topics: ["Faringite Aguda","Influenza & Gripe","Mononucleose & Epstein Barr","Resfriado Comum","Rinossinusite Aguda","Síndrome Gripal & SRAG","Otite Média Aguda em Crianças","Rinossinusite em Crianças","Crupe"] },
  { name: "Infecções do SNC", area: "Clínica Médica", topics: ["Meningites","Encefalites Infecciosas","Encefalite Herpética","Poliomielite","Encefalites Autoimunes"] },
  { name: "Infecções na Gestação", area: "Ginecologia e Obstetrícia", topics: ["HIV na Gestação","Sífilis na Gestação","Outras Infecções na Gestação","ITU na Gestação","Toxoplasmose na Gestação"] },
  { name: "Infecções Respiratórias", area: "Clínica Médica", topics: ["Pneumonia Adquirida na Comunidade","Pneumonia: Aspectos Patológicos e Radiológicos","Pneumonia por Micoplasma e Clamídia","Difteria","Radiografia de Tórax (Multimídia)","Abscesso Pulmonar","COVID-19"] },
  { name: "Infectologia Brasileira", area: "Clínica Médica", topics: ["Leishmaniose","Doença de Chagas","Malária","Leptospirose","Febre Maculosa","Hanseníase","Hantavirose","Medicina Tropical (Multimídia)"] },
  { name: "Infectologia Pediátrica", area: "Pediatria", topics: ["Bronquiolite","Coqueluche","Pneumonia na Criança","Radiografia de Tórax Pediátrico (Multimídia)","ITU na Criança","Meningites em Crianças","Caxumba","Síndrome da Pele Escaldada Estafilocócica","Febre Sem Sinais Localizatórios & de Origem Indeterminada"] },
  { name: "Insuficiência Cardíaca", area: "Clínica Médica", topics: ["Insuficiência Cardíaca – Ambulatorial","Insuficiência Cardíaca – Descompensação","Temas Avançados de Insuficiência Cardíaca","ECG Básico (Multimídia)","Síncope","Amiloidose","Cardiomiopatias"] },
  { name: "Insuficiência Hepática", area: "Clínica Médica", topics: ["Peritonite Bacteriana Espontânea","Encefalopatia Hepática","Hipertensão Portal","Ascite","Síndrome Hepatorrenal","Cirrose","Insuficiência Hepática Aguda"] },
  { name: "Insuficiência Renal", area: "Clínica Médica", topics: ["Injúria Renal Aguda","Diálise","Transplante Renal","Doença Renal Crônica"] },
  { name: "Intercorrências no Parto", area: "Ginecologia e Obstetrícia", topics: ["Rotura Prematura de Membranas Ovulares","Restrição de Crescimento Intrauterino","Dopplervelocitometria e Perfil Biofísico Fetal","Trabalho de Parto Prematuro","Corioamnionite","Pós-Datismo","Óbito Fetal","Fórceps","Imagens de Cardiotocografia (Multimídia)","Cardiotocografia"] },
  { name: "Lesões Hepáticas", area: "Clínica Cirúrgica", topics: ["Abscesso Hepático","Tumores Hepáticos Benignos","Carcinoma Hepatocelular","Lesões Focais & Tumores Hepáticos (Multimídia)","Lesões Císticas do Fígado e Via Biliar"] },
  { name: "Mama", area: "Ginecologia e Obstetrícia", topics: ["Câncer de Mama","Rastreio do Câncer de Mama","Lesões Benignas da Mama","Mastalgia","Secreção Papilar","Semiologia Mamária (Multimídia)","Mamografia (Multimídia)","Ultrassonografia Mamária (Multimídia)"] },
  { name: "Medicina Baseada em Evidências", area: "Preventiva & Social", topics: ["Estudos Epidemiológicos","Conceitos em Pesquisa Clínica","Testes Diagnósticos","Medidas de Associação","Bioestatística"] },
  { name: "Medicina Legal", area: "Preventiva & Social", topics: ["Saúde do Trabalhador","Código de Ética Médica","Morte Encefálica","Declaração de Óbito","Declaração de Óbito (Multimídia)","Medicina Legal (Multimídia)"] },
  { name: "Menopausa", area: "Ginecologia e Obstetrícia", topics: ["Síndrome Genitourinária da Menopausa","Climatério e Menopausa","Incontinência Urinária","Prolapso de Órgãos Pélvicos"] },
  { name: "Micologia", area: "Clínica Médica", topics: ["Paracoccidioidomicose","Aspergilose Invasiva","Esporotricose","Mucormicose"] },
  { name: "Neoplasias Urológicas", area: "Clínica Cirúrgica", topics: ["Câncer de Próstata","Câncer de Bexiga","Câncer de Pênis","Câncer de Testículo","Tumores Renais","Cistos & Massas Renais (Multimídia)"] },
  { name: "Neurologia", area: "Clínica Médica", topics: ["Epilepsia e Crises Epilépticas e Estado de Mal","Convulsão Febril","Paralisia de Bell","Trombose Venosa Cerebral","Mielopatias","Distúrbios do Sono","Semiologia Neurológica (Multimídia)","Miastenia Gravis","Síndrome Miastênica de Eaton-Lambert","Síndrome de Guillain-Barré","Esclerose Lateral Amiotrófica","Esclerose Múltipla","Doenças Desmielinizantes (Questões)"] },
  { name: "Neurologia Pediátrica", area: "Pediatria", topics: ["BRUE","Transtorno do Espectro Autista (TEA)","Transtorno do Déficit de Atenção e Hiperatividade","Transtorno Opositor Desafiador","Paralisia Cerebral"] },
  { name: "Obesidade", area: "Clínica Médica", topics: ["Cirurgia Bariátrica e Metabólica","Obesidade e Síndrome Metabólica","Apneia Obstrutiva do Sono"] },
  { name: "Oftalmologia", area: "Clínica Médica", topics: ["Abrasão Corneana e Corpo Estranho","Conjuntivites","Olho Vermelho (Questões)","Glaucoma","Catarata","Trauma Ocular","Exame Físico Oftalmológico","Fundoscopia","Anatomia do Olho","Degeneração Macular","Distúrbios da Refração","Doenças da Pálpebra","Estrabismo"] },
  { name: "Oncoginecologia", area: "Ginecologia e Obstetrícia", topics: ["Câncer de Colo Invasivo","Rastreio do Câncer de Colo","Câncer de Ovário","Hiperplasia e Câncer de Endométrio","Massas Anexiais Benignas","Massas Anexiais (Multimídia)","Dermatoses da Vulva","Neoplasias da Vulva"] },
  { name: "Oncohematologia", area: "Clínica Médica", topics: ["Mieloma Múltiplo","Trombocitemia Essencial","Síndromes Mielodisplásicas","Mielofibrose Primária","Policitemia Vera","Outras Gamopatias Monoclonais","Leucemias Mieloides","Leucemias Linfoides","Linfomas","Leucemias (Questões)","Neutropenia Febril","Síndrome de Lise Tumoral","Emergências Oncológicas (Questões)"] },
  { name: "Ortopedia", area: "Clínica Cirúrgica", topics: ["Lombalgia","Radiculopatias","Semiologia Ortopédica I (Multimídia)","Semiologia Ortopédica II (Multimídia)","Osteomielite em Adultos","Cisto de Baker","Lesões Meniscais","Lesões do Ligamento Cruzado Anterior","Síndrome do Impacto","Entorses de Tornozelo","Lesões do Tendão de Aquiles","Síndrome do Túnel do Carpo","Epicondilite","Tendinopatia de Quervain","Síndrome do Desfiladeiro Torácico","Lesões de Manguito Rotador","Osteogênese Imperfeita","Tumores Ósseos Malignos","Tumores Ósseos Benignos"] },
  { name: "Ortopedia Pediátrica", area: "Pediatria", topics: ["Mielomeningocele","Sinovite Transitória","Doença de Osgood-Schlatter","Displasia do Desenvolvimento do Quadril","Epifisiólise Proximal do Fêmur","Escoliose","Torcicolo Congênito","Dor do Crescimento"] },
  { name: "Otorrinolaringologia", area: "Clínica Médica", topics: ["Otoscopia (Multimídia)","Condições da Orelha e Ouvido (Multimídia)","Condições da Boca (Multimídia)","Otite Externa","Otite Média","Epistaxe","Distúrbios da Audição"] },
  { name: "Outras Hepatopatias", area: "Clínica Médica", topics: ["Doença de Wilson","Hemocromatose Hereditária","Transplante Hepático","Colangite Biliar Primária","Colangite Esclerosante Primária","Doença Hepática Esteatótica Associada à Disfunção Metabólica","Metabolismo da Bilirrubina e Icterícias não-obstrutivas"] },
  { name: "Outras Infecções", area: "Clínica Médica", topics: ["Febre Tifoide","Varíola","Mpox","Tétano","Raiva Humana","Herpes-Zóster","Herpes Simplex"] },
  { name: "Outras Pneumopatias", area: "Clínica Médica", topics: ["Tabagismo","Hipertensão Pulmonar","Avaliação das Doenças Pulmonares Intersticiais","Fibrose Pulmonar Idiopática","Bronquiectasia","Tosse Crônica"] },
  { name: "Parasitoses", area: "Clínica Médica", topics: ["Giardíase","Toxocaríase","Estrongiloidíase","Esquistossomose","Ascaridíase","Amebíase","Cisticercose","Ancilostomíase","Tricuríase","Parasitoses (Questões)"] },
  { name: "Parto", area: "Ginecologia e Obstetrícia", topics: ["Profilaxia de Estrepto B","Fases do Trabalho de Parto","Estática Fetal","Indução do Parto","Parto Pélvico","Partograma","Assistência ao Trabalho de Parto","Cesárea","Distócias"] },
  { name: "Pré-Natal", area: "Ginecologia e Obstetrícia", topics: ["Diagnóstico & Datação da Gestação","Adaptações & Queixas da Gestação","Assistência Pré-Natal","Vacinas da Gestante","Direitos da Gestante","Fármacos na Gestação","Êmese e Hiperêmese Gravídica","Aloimunização Rh","Semiologia Obstétrica (Multimídia)","Ultrassonografia na Obstetrícia (Multimídia)"] },
  { name: "Prematuridade", area: "Pediatria", topics: ["Complicações da Prematuridade","Displasia Broncopulmonar","Enterocolite Necrosante","Doença Hemorrágica do RN"] },
  { name: "Princípios de Cirurgia", area: "Clínica Cirúrgica", topics: ["Avaliação Pré-Operatória","Protocolo de Cirurgia Segura","Nutrição Perioperatória","REMIT","Cicatrização de Feridas","Fios & Suturas","Cirurgia Minimamente Invasiva","Instrumentação Cirúrgica (Multimídia)","Acesso Venoso Central","Tórax e Abdome (Multimídia)","Partes Moles (Multimídia)","Ostomias"] },
  { name: "Psiquiatria", area: "Clínica Médica", topics: ["Transtornos de Ansiedade","Transtornos Depressivos","Transtornos de Personalidade","Esquizofrenia & Psicose","Transtorno Afetivo Bipolar","Transtornos Alimentares","Álcool","Antidepressivos e Ansiolíticos","Antipsicóticos e Antiepilépticos e Estabilizadores do Humor","Suicídio","Transtornos Somáticos","Síndrome de Burnout"] },
  { name: "Puericultura", area: "Pediatria", topics: ["Aleitamento Materno","Introdução Alimentar","Vitaminas & Minerais na Puericultura","Avaliação do DNPM","Avaliação Pôndero-Estatural","Desnutrição","Saúde Bucal","Abuso Infantil","Enurese Noturna","Puericultura (Multimídia)","DNPM (Multimídia)","Maus Tratos (Multimídia)"] },
  { name: "Puerpério", area: "Ginecologia e Obstetrícia", topics: ["Modificações Fisiológicas do Puerpério","Infecções Puerperais","Hemorragia Pós-Parto"] },
  { name: "Reações Transfusionais", area: "Clínica Médica", topics: ["Reações Febris Não-Hemolíticas","Reações Hemolíticas","TRALI e TACO","Reações Transfusionais (Questões)"] },
  { name: "Reumatologia Pediátrica", area: "Pediatria", topics: ["Doença de Kawasaki","Síndrome Inflamatória Multissistêmica Pediátrica (SIM-P)","Síndrome PFAPA","Artrite Idiopática Juvenil","Lúpus Eritematoso Sistêmico Juvenil"] },
  { name: "Sangramento Uterino Anormal", area: "Ginecologia e Obstetrícia", topics: ["Avaliação de SUA","Adenomiose","Dismenorreia","Leiomioma","Pólipo Uterino","Endometriose","Semiologia Ginecológica (Multimídia)","Ultrassonografia na Ginecologia (Multimídia)"] },
  { name: "Sangramentos na Gestação", area: "Ginecologia e Obstetrícia", topics: ["Doença Trofoblástica Gestacional","Abortamento","Gestação Ectópica","Violência Sexual e Aborto Induzido","Abuso Sexual (Multimídia)","Placenta Prévia","Descolamento Prematuro de Placenta","Rotura Uterina","Vasa Prévia"] },
  { name: "Sepse & Infecções Relacionadas à Assistência à Saúde", area: "Clínica Médica", topics: ["Segurança do Profissional da Saúde","Infecção por C. difficile","Pneumonia Associada ao Ventilador","Infecção de Corrente Sanguínea associada à Cateter","Sepse e Choque Séptico","Infecção do Trato Urinário"] },
  { name: "Síndromes Demenciais", area: "Clínica Médica", topics: ["Avaliação do Paciente com Demência","Demência Vascular","Doença de Alzheimer","Demência Frontotemporal","Demência por Corpúsculos de Lewy","Demências Infecciosas","Hidrocefalia de Pressão Normal"] },
  { name: "SUS & Políticas Públicas", area: "Preventiva & Social", topics: ["Marcos Históricos do SUS","Organização Jurídica do SUS","Organização Financeira do SUS","Princípios do SUS","Política Nacional de Humanização","Políticas e Protocolos","Políticas de Saúde Mental","SUS (Questões)"] },
  { name: "Transtornos do Movimento", area: "Clínica Médica", topics: ["Doença de Parkinson","Distonia & Discinesia Tardia","Conceitos sobre Transtornos do Movimento","Tremor Essencial","Doença de Huntington","Atrofia de Múltiplos Sistemas","Degeneração Corticobasal","Paralisia Supranuclear Progressiva"] },
  { name: "Trauma - Abdominal & Pélvico", area: "Clínica Cirúrgica", topics: ["Trauma Abdominal e Diafragmático","Trauma Gastrointestinal","Trauma Esplênico","Trauma Hepático","Trauma de Abdome e Pelve - Radiografia (Multimídia)","Cirurgia de Controle de Danos","e-FAST (Multimídia)","FAST – Noções de Ultrassonografia (Multimídia)","Trauma Abdominal – Tomografia (Multimídia)","Trauma Pélvico"] },
  { name: "Trauma - Avaliação Inicial", area: "Clínica Cirúrgica", topics: ["Epidemiologia e Triagem no Trauma","Avaliação Inicial no Trauma","Imobilização Cervical e Via Aérea no Trauma","Via Aérea Básica e Avançada","Choque Hemorrágico","Tromboelastografia"] },
  { name: "Trauma - Queimadura & Populações Especiais", area: "Clínica Cirúrgica", topics: ["Queimaduras","Choque Elétrico","Afogamento","Trauma na Criança","Trauma na Gestante","Trauma no Idoso"] },
  { name: "Trauma - Retroperitoneal", area: "Clínica Cirúrgica", topics: ["Trauma Retroperitoneal","Trauma do Duodeno e do Pâncreas","Trauma Renal","Trauma de Uretra & Bexiga & Ureter"] },
  { name: "Trauma - TCE", area: "Clínica Cirúrgica", topics: ["Noções Gerais de TCE e Concussão","Fratura de Crânio e Hematomas Intracranianos","TCE Grave e Herniação Cerebral","Escala de Coma de Glasgow","Trauma Cranioencefálico (Multimídia)"] },
  { name: "Trauma Torácico & Outros", area: "Clínica Cirúrgica", topics: ["Trauma Torácico","Trauma Torácico - Radiografia (Multimídia)","Trauma de Face","Trauma Cervical","Trauma Vertebral e Raquimedular","Trauma de Extremidades"] },
  { name: "Triagem Neonatal & Síndromes e Doenças Genéticas", area: "Pediatria", topics: ["Testes de Triagem Neonatal","Fibrose Cística","Hiperplasia Adrenal Congênita","Hipotireoidismo Congênito","Erros Inatos do Metabolismo","Discinesia Ciliar Primária","Síndrome de Down","Síndrome Alcoólica Fetal","Síndromes Genéticas & Doenças Congênitas (Multimídia)","Rastreamento de Cromossomopatias (Questões)"] },
  { name: "Tuberculose", area: "Clínica Médica", topics: ["Tuberculose - Patogênese e Epidemiologia","Tuberculose - Clínica e Diagnóstico","Tuberculose - Tratamento","Tuberculose Latente","Tuberculose Miliar e Extrapulmonar","Tuberculose na Criança","Tuberculose Pulmonar (Questões)"] },
  { name: "Úlceras Genitais", area: "Clínica Médica", topics: ["Herpes Genital","Linfogranuloma Venéreo","Cancroide","Donovanose","Úlcera de Lipschütz","Abordagem das Úlceras Genitais","Sífilis","Lesões por Infecções Sexualmente Transmissíveis (Multimídia)"] },
  { name: "Urologia", area: "Clínica Cirúrgica", topics: ["Nefrolitíase","Hiperplasia Prostática Benigna","Priapismo","Doença de Peyronie","Afecções Testiculares","Urologia (Multimídia)"] },
  { name: "Vacinação", area: "Preventiva & Social", topics: ["Noções Sobre Vacinação","Calendário Vacinal - Criança & Adulto & Idoso","Vacinas das Arboviroses","BCG","Pentavalente e DTP","Vacinas da Poliomielite","Vacina do Rotavírus","Vacinas das Hepatites","Vacinas do Pneumococo & Meningococo","Vacinas do HPV","Influenza & COVID-19 & VSR","Tríplice Viral & Varicela & Herpes-Zóster"] },
  { name: "Vasculites", area: "Clínica Médica", topics: ["Arterite de Takayasu","Arterite de Células Gigantes","Poliarterite Nodosa","Vasculite por IgA","Granulomatose Eosinofílica com Poliangeíte","Granulomatose com Poliangeíte & Poliangeíte Microscópica","Tromboangeíte Obliterante","Doença de Behçet","Behçet e Tromboangeíte Obliterante (Questões)"] },
  { name: "Vertigem", area: "Clínica Médica", topics: ["Doença de Menière","Avaliação da Vertigem","Neurite Vestibular","Vertigem Posicional Paroxística Benigna"] },
  { name: "Vias Biliares", area: "Clínica Cirúrgica", topics: ["Colecistite","Colelitíase e Colecistolitíase","Coledocolitíase","Colecistectomia e Lesões da Via Biliar","Colangite Aguda","Íleo Biliar","Síndrome de Mirizzi","Vesícula de Porcelana","Câncer da Vesícula Biliar","Colangiocarcinoma","Colangiografia & CPRE (Multimídia)","Ultrassonografia das Vias Biliares (Multimídia)","Neoplasias da Via Biliar (Questões)"] },
  { name: "Vulvovaginites", area: "Ginecologia e Obstetrícia", topics: ["Vaginose Bacteriana","Tricomoníase","Vaginite Inflamatória Descamativa","Cisto & Abscesso da Glândula de Bartholin","Vaginose Citolítica","Candidíase Vaginal","Vulvovaginites em Crianças","Doença Inflamatória Pélvica","Cervicite & Uretrite & Epididimite & Proctite"] },
];

// Compute prevalence score for each module
function computeModulePrevalence(mod) {
  let score = 0;
  let count = 0;
  mod.topics.forEach(topic => {
    const idx = PREVALENCE_ORDER.indexOf(topic);
    if (idx !== -1) {
      score += (PREVALENCE_ORDER.length - idx);
      count++;
    }
  });
  return count > 0 ? score / count : 0;
}

const MODULES_INITIAL = RAW_MODULES.map((m, i) => ({
  id: `mod-${i}`,
  name: m.name,
  area: m.area,
  topics: m.topics,
  status: "não estudado",
  prevalenceScore: computeModulePrevalence(m),
  history: [],
  generalReviews: [],
  nextReview: null,
  totalQuestions: 0,
  avgAccuracy: 0,
})).sort((a, b) => b.prevalenceScore - a.prevalenceScore);

// ============================================================
// HELPERS
// ============================================================
const EXAM_DATE = new Date("2026-11-15");
const TARGET_QUESTIONS = 15000;
const DAILY_GOAL = 80;
const VESP_DAYS = 30; // days before exam considered 'véspera'

function isVesperaMode() {
  return daysBetween(new Date(), EXAM_DATE) <= VESP_DAYS;
}

function daysBetween(d1, d2) {
  return Math.round((d2 - d1) / (1000 * 60 * 60 * 24));
}

function daysFromNow(date) {
  return daysBetween(new Date(), date);
}

function addDays(date, n) {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d;
}

function formatDate(date) {
  if (!date) return "—";
  const d = new Date(date);
  return d.toLocaleDateString("pt-BR");
}

// How many days since last study/review of a module
function daysSinceLastContact(m) {
  if (!m.history || m.history.length === 0) return null;
  const last = m.history[m.history.length - 1];
  return daysBetween(new Date(last.date), new Date());
}

// Suggested questions for a review session based on prevalence + performance
function calcSuggestedQuestions(m) {
  const maxScore = MODULES_INITIAL[0]?.prevalenceScore || 1;
  const prevFactor = m.prevalenceScore / maxScore; // 0–1, higher = more prevalent

  // Base: 20–50 questions
  let base = Math.round(20 + prevFactor * 30); // 20 at lowest, 50 at highest prevalence

  // Performance penalty: lower accuracy → more questions
  if (m.avgAccuracy > 0) {
    if (m.avgAccuracy < 50) base = Math.round(base * 1.4);
    else if (m.avgAccuracy < 65) base = Math.round(base * 1.2);
    else if (m.avgAccuracy >= 85) base = Math.round(base * 0.8);
  }

  // Proximity to exam boost
  const daysLeft = daysBetween(new Date(), EXAM_DATE);
  if (daysLeft < 60) base = Math.round(base * 1.3);
  else if (daysLeft < 120) base = Math.round(base * 1.1);

  return Math.max(10, Math.min(60, base));
}

// Why is this module being suggested today
function calcRevisionReason(m) {
  const maxScore = MODULES_INITIAL[0]?.prevalenceScore || 1;
  const prevFactor = m.prevalenceScore / maxScore;
  const today = new Date(); today.setHours(0,0,0,0);
  const isOverdue = m.nextReview && new Date(m.nextReview) < today;
  const daysSince = daysSinceLastContact(m);

  const reasons = [];
  if (isOverdue) reasons.push("⚠️ Revisão atrasada");
  if (m.avgAccuracy > 0 && m.avgAccuracy < 60) reasons.push("📉 Desempenho baixo");
  if (prevFactor > 0.6) reasons.push("🔥 Alta incidência");
  if (daysSince !== null && daysSince > 14 && prevFactor > 0.4) reasons.push(`⏰ Sem contato há ${daysSince} dias`);
  if (reasons.length === 0) reasons.push("📅 Revisão programada");
  return reasons;
}

// Max days a module can go without review based on prevalence
function maxDaysWithoutReview(m) {
  const maxScore = MODULES_INITIAL[0]?.prevalenceScore || 1;
  const prevFactor = m.prevalenceScore / maxScore;
  // Highest prevalence: max 10 days; lowest: 30 days
  return Math.round(30 - prevFactor * 20);
}

// Is a studied module overdue for contact (even if not scheduled)?
function isNeglected(m) {
  if (m.status === "não estudado") return false;
  const maxScore = MODULES_INITIAL[0]?.prevalenceScore || 1;
  const prevFactor = m.prevalenceScore / maxScore;
  if (prevFactor < 0.3) return false; // low prevalence, don't flag
  const daysSince = daysSinceLastContact(m);
  if (daysSince === null) return false;
  return daysSince > maxDaysWithoutReview(m);
}

function calcNextReview(lastDate, accuracy, prevalenceScore, reviewCount) {
  const maxScore = MODULES_INITIAL[0]?.prevalenceScore || 1;
  const prevFactor = prevalenceScore / maxScore;

  let baseInterval;
  if (accuracy >= 85) baseInterval = 14;
  else if (accuracy >= 70) baseInterval = 7;
  else if (accuracy >= 50) baseInterval = 4;
  else baseInterval = 2;

  // High prevalence = shorter intervals (never > 10 days for top modules)
  const interval = Math.max(2, Math.round(baseInterval * (1 - prevFactor * 0.45)));
  const daysLeft = daysBetween(new Date(), EXAM_DATE);
  const urgencyFactor = daysLeft < 60 ? 0.65 : daysLeft < 120 ? 0.82 : 1;

  return addDays(lastDate, Math.round(interval * urgencyFactor));
}

function calcGeneralReviews(firstContact, prevalenceScore) {
  const maxScore = MODULES_INITIAL[0]?.prevalenceScore || 1;
  const rel = prevalenceScore / maxScore;
  const daysLeft = daysBetween(firstContact, EXAM_DATE);

  let numReviews;
  if (rel > 0.7) numReviews = 3;
  else if (rel > 0.3) numReviews = 2;
  else numReviews = daysLeft > 90 ? 2 : 1;

  const reviews = [];
  for (let i = 1; i <= numReviews; i++) {
    const fraction = i / (numReviews + 1);
    const offset = Math.round(daysLeft * fraction);
    reviews.push({
      id: `gr-${Date.now()}-${i}`,
      date: addDays(firstContact, offset),
      status: "pendente",
    });
  }
  return reviews;
}

const AREA_COLORS = {
  "Clínica Médica": "#6366f1",
  "Clínica Cirúrgica": "#f59e0b",
  "Pediatria": "#10b981",
  "Ginecologia e Obstetrícia": "#ec4899",
  "Preventiva & Social": "#14b8a6",
};

const AREA_BG = {
  "Clínica Médica": "#eef2ff",
  "Clínica Cirúrgica": "#fffbeb",
  "Pediatria": "#ecfdf5",
  "Ginecologia e Obstetrícia": "#fdf2f8",
  "Preventiva & Social": "#f0fdfa",
};

// ============================================================
// STORAGE
// ============================================================
function loadState() {
  try {
    const s = localStorage.getItem("residencia_state");
    if (s) return JSON.parse(s);
  } catch (e) {}
  return null;
}

function saveState(state) {
  try {
    localStorage.setItem("residencia_state", JSON.stringify(state));
  } catch (e) {}
}

// ============================================================
// MAIN APP
// ============================================================
export default function App() {
  const [page, setPage] = useState("home");
  const [modules, setModules] = useState(() => {
    const saved = loadState();
    return saved?.modules || MODULES_INITIAL;
  });
  const [errors, setErrors] = useState(() => {
    const saved = loadState();
    return saved?.errors || [];
  });
  const [exams, setExams] = useState(() => {
    const saved = loadState();
    return saved?.exams || [];
  });
  const [studyLog, setStudyLog] = useState(() => {
    try { return JSON.parse(localStorage.getItem("study_log") || "[]"); } catch(e) { return []; }
  });
  const [filterArea, setFilterArea] = useState("Todas");
  const [filterStatus, setFilterStatus] = useState("Todos");
  const [searchQ, setSearchQ] = useState("");
  const [selectedModule, setSelectedModule] = useState(null);
  const [showStudyModal, setShowStudyModal] = useState(false);
  const [studyForm, setStudyForm] = useState({ date: new Date().toISOString().slice(0,10), questions: "", accuracy: "" });
  const [errorForm, setErrorForm] = useState({ title: "", area: "Clínica Médica", module: "", topic: "", content: "", favorite: false });
  const [showErrorForm, setShowErrorForm] = useState(false);

  useEffect(() => {
    saveState({ modules, errors, exams });
  }, [modules, errors]);

  const [todayDone, setTodayDone] = useState(0);

  // Computed stats
  const stats = useMemo(() => {
    const studied = modules.filter(m => m.status !== "não estudado");
    const totalQ = modules.reduce((s, m) => s + m.totalQuestions, 0);
    const totalRev = modules.reduce((s, m) => s + m.history.length, 0);
    const concluded = modules.filter(m => m.status === "concluído").length;

    const today = new Date(); today.setHours(0,0,0,0);
    const tomorrow = addDays(today, 1);

    const todayRevs = modules.filter(m => m.nextReview && new Date(m.nextReview) >= today && new Date(m.nextReview) < tomorrow);
    const overdueRevs = modules.filter(m => m.nextReview && new Date(m.nextReview) < today && m.status !== "não estudado");
    const pendingGR = modules.flatMap(m => (m.generalReviews || []).filter(r => {
      const d = new Date(r.date); d.setHours(0,0,0,0);
      return r.status === "pendente" && d <= today;
    })).length;

    const accuracies = studied.filter(m => m.avgAccuracy > 0).map(m => m.avgAccuracy);
    const globalAccuracy = accuracies.length ? Math.round(accuracies.reduce((a,b)=>a+b,0)/accuracies.length) : 0;

    // Neglected high-prevalence modules
    const neglected = modules.filter(isNeglected);

    // Véspera mode: only top-prevalence studied modules with worst performance
    const vesp = isVesperaMode();
    const seen = new Set();
    const planModules = [];

    if (vesp) {
      // Only modules already studied, sorted by priority (prevalence * inverse accuracy)
      const vespCandidates = modules
        .filter(m => m.status !== "não estudado")
        .sort((a, b) => {
          const scoreA = a.prevalenceScore * (1 - (a.avgAccuracy || 50) / 100);
          const scoreB = b.prevalenceScore * (1 - (b.avgAccuracy || 50) / 100);
          return scoreB - scoreA;
        });
      vespCandidates.forEach(m => { if (!seen.has(m.id)) { seen.add(m.id); planModules.push(m); } });
    } else {
      [...overdueRevs, ...todayRevs, ...neglected].forEach(m => {
        if (!seen.has(m.id)) { seen.add(m.id); planModules.push(m); }
      });
      planModules.sort((a,b) => b.prevalenceScore - a.prevalenceScore);
    }

    let remaining = DAILY_GOAL;
    const plan = planModules.map(m => {
      const suggested = Math.min(remaining, calcSuggestedQuestions(m));
      remaining = Math.max(0, remaining - suggested);
      return { ...m, suggestedQuestions: suggested, reasons: vesp ? ["🔴 Modo Véspera", ...calcRevisionReason(m)] : calcRevisionReason(m) };
    }).filter(m => m.suggestedQuestions > 0);

    return { totalQ, totalRev, concluded, todayRevs, overdueRevs, pendingGR, globalAccuracy, studied: studied.length, neglected, plan, vesp };
  }, [modules]);

  function registerStudy() {
    if (!selectedModule || !studyForm.questions || !studyForm.accuracy) return;
    const date = new Date(studyForm.date);
    const questions = parseInt(studyForm.questions);
    const accuracy = parseFloat(studyForm.accuracy);
    
    const entry = { date: date.toISOString(), questions, accuracy, label: `Revisão ${selectedModule.history.length + 1}` };
    const newHistory = [...(selectedModule.history || []), entry];
    const totalQ = newHistory.reduce((s, h) => s + h.questions, 0);
    const avgAcc = Math.round(newHistory.reduce((s, h) => s + h.accuracy, 0) / newHistory.length);
    const nextReview = calcNextReview(date, accuracy, selectedModule.prevalenceScore, newHistory.length);
    
    let generalReviews = selectedModule.generalReviews || [];
    if (newHistory.length === 1) {
      generalReviews = calcGeneralReviews(date, selectedModule.prevalenceScore);
    }
    
    const status = accuracy >= 80 && newHistory.length >= 3 ? "concluído" : "em andamento";
    
    setModules(prev => prev.map(m => m.id === selectedModule.id ? {
      ...m, history: newHistory, totalQuestions: totalQ, avgAccuracy: avgAcc,
      nextReview: nextReview.toISOString(), status, generalReviews,
    } : m));
    setSelectedModule(prev => ({...prev, history: newHistory, totalQuestions: totalQ, avgAccuracy: avgAcc, nextReview: nextReview.toISOString(), status, generalReviews}));
    // Log study day for heatmap/streak
    const logDate = new Date(studyForm.date).toISOString().slice(0,10);
    setStudyLog(prev => prev.includes(logDate) ? prev : [...prev, logDate]);
    setShowStudyModal(false);
    setStudyForm({ date: new Date().toISOString().slice(0,10), questions: "", accuracy: "" });
  }

  function toggleGeneralReview(modId, grId) {
    setModules(prev => prev.map(m => m.id === modId ? {
      ...m, generalReviews: (m.generalReviews || []).map(r => r.id === grId ? { ...r, status: r.status === "feita" ? "pendente" : "feita" } : r)
    } : m));
  }

  function addError() {
    const e = { ...errorForm, id: `err-${Date.now()}`, date: new Date().toISOString() };
    setErrors(prev => [e, ...prev]);
    setErrorForm({ title: "", area: "Clínica Médica", module: "", topic: "", content: "", favorite: false });
    setShowErrorForm(false);
  }

  const filteredModules = useMemo(() => {
    return modules.filter(m => {
      if (filterArea !== "Todas" && m.area !== filterArea) return false;
      if (filterStatus !== "Todos" && m.status !== filterStatus) return false;
      if (searchQ && !m.name.toLowerCase().includes(searchQ.toLowerCase())) return false;
      return true;
    });
  }, [modules, filterArea, filterStatus, searchQ]);

  // ---- RENDER ----
  return (
    <div style={{ fontFamily: "'DM Sans', 'Nunito', system-ui, sans-serif", minHeight: "100vh", background: "#f8f7f5", color: "#1a1a2e" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Serif+Display&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #f0f0f0; }
        ::-webkit-scrollbar-thumb { background: #c0c0d0; border-radius: 3px; }
        .card { background: #fff; border-radius: 16px; box-shadow: 0 1px 4px rgba(0,0,0,.06), 0 4px 16px rgba(0,0,0,.04); }
        .btn { cursor: pointer; border: none; border-radius: 10px; font-family: inherit; font-weight: 600; transition: all .15s; }
        .btn-primary { background: #6366f1; color: #fff; padding: 10px 20px; }
        .btn-primary:hover { background: #4f46e5; transform: translateY(-1px); }
        .btn-sm { padding: 6px 14px; font-size: 13px; border-radius: 8px; }
        .btn-ghost { background: transparent; color: #6366f1; border: 1.5px solid #6366f1; padding: 8px 16px; }
        .btn-ghost:hover { background: #eef2ff; }
        .tag { display: inline-block; padding: 3px 10px; border-radius: 20px; font-size: 12px; font-weight: 600; }
        .input { width: 100%; padding: 10px 14px; border: 1.5px solid #e5e5eb; border-radius: 10px; font-family: inherit; font-size: 14px; outline: none; transition: border .15s; }
        .input:focus { border-color: #6366f1; }
        .nav-item { cursor: pointer; padding: 10px 18px; border-radius: 10px; font-weight: 500; font-size: 14px; transition: all .15s; color: #555; display: flex; align-items: center; gap: 8px; }
        .nav-item:hover { background: #f0f0f8; color: #6366f1; }
        .nav-item.active { background: #eef2ff; color: #6366f1; font-weight: 700; }
        .progress-bar { height: 6px; background: #e8e8f0; border-radius: 3px; overflow: hidden; }
        .progress-fill { height: 100%; border-radius: 3px; transition: width .4s; }
        .modal-bg { position: fixed; inset: 0; background: rgba(0,0,0,.35); z-index: 100; display: flex; align-items: center; justify-content: center; padding: 20px; }
        .modal { background: #fff; border-radius: 20px; padding: 28px; width: 100%; max-width: 500px; max-height: 90vh; overflow-y: auto; }
        .status-dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; }
        .module-card { background: #fff; border-radius: 14px; padding: 18px; border: 1.5px solid #ebebf3; transition: all .15s; cursor: pointer; }
        .module-card:hover { border-color: #6366f1; box-shadow: 0 4px 20px rgba(99,102,241,.1); transform: translateY(-2px); }
        textarea.input { resize: vertical; min-height: 100px; }
        .badge { display: inline-flex; align-items: center; gap: 4px; padding: 4px 10px; border-radius: 20px; font-size: 12px; font-weight: 600; }
      `}</style>

      {/* SIDEBAR + CONTENT */}
      <div style={{ display: "flex", minHeight: "100vh" }}>
        
        {/* Sidebar */}
        <div style={{ width: 220, background: "#fff", borderRight: "1.5px solid #ebebf3", padding: "24px 14px", display: "flex", flexDirection: "column", gap: 4, position: "sticky", top: 0, height: "100vh", overflowY: "auto" }}>
          <div style={{ padding: "0 8px 20px", borderBottom: "1px solid #f0f0f8", marginBottom: 8 }}>
            <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 18, color: "#1a1a2e", lineHeight: 1.2 }}>Residência</div>
            <div style={{ fontSize: 12, color: "#888", marginTop: 2 }}>Sistema de Estudos</div>
          </div>
          
          {[
            { id: "home", icon: "🏠", label: "Início" },
            { id: "modules", icon: "📚", label: "Módulos" },
            { id: "schedule", icon: "📅", label: "Revisões" },
            { id: "performance", icon: "📊", label: "Desempenho" },
            { id: "errors", icon: "📝", label: "Caderno de Erros" },
            { id: "exams", icon: "🏆", label: "Provas na Íntegra" },
          ].map(nav => (
            <div key={nav.id} className={`nav-item ${page === nav.id ? "active" : ""}`} onClick={() => setPage(nav.id)}>
              <span>{nav.icon}</span> {nav.label}
            </div>
          ))}
          
          <div style={{ marginTop: "auto", padding: "16px 8px 0", borderTop: "1px solid #f0f0f8" }}>
            <div style={{ fontSize: 12, color: "#888", marginBottom: 6 }}>Prova em</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: "#6366f1" }}>{Math.max(0, daysFromNow(EXAM_DATE))} dias</div>
            <div style={{ fontSize: 11, color: "#aaa" }}>15 Nov 2026</div>
            <div style={{ marginTop: 10 }}>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${Math.min(100, (stats.totalQ/TARGET_QUESTIONS)*100)}%`, background: "#6366f1" }} />
              </div>
              <div style={{ fontSize: 11, color: "#888", marginTop: 4 }}>{stats.totalQ.toLocaleString()} / {TARGET_QUESTIONS.toLocaleString()} questões</div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div style={{ flex: 1, overflowY: "auto", padding: "28px 32px" }}>
          
          {page === "home" && <HomePage stats={stats} modules={modules} setPage={setPage} setSelectedModule={setSelectedModule} setShowStudyModal={setShowStudyModal} toggleGeneralReview={toggleGeneralReview} todayDone={todayDone} setTodayDone={setTodayDone} studyLog={studyLog} />}
          {page === "modules" && <ModulesPage modules={filteredModules} filterArea={filterArea} setFilterArea={setFilterArea} filterStatus={filterStatus} setFilterStatus={setFilterStatus} searchQ={searchQ} setSearchQ={setSearchQ} setSelectedModule={m => { setSelectedModule(m); setPage("moduleDetail"); }} stats={stats} />}
          {page === "moduleDetail" && selectedModule && <ModuleDetailPage module={modules.find(m => m.id === selectedModule.id) || selectedModule} onBack={() => setPage("modules")} onStudy={() => setShowStudyModal(true)} toggleGR={toggleGeneralReview} setSelectedModule={setSelectedModule} />}
          {page === "schedule" && <SchedulePage modules={modules} setPage={setPage} setSelectedModule={setSelectedModule} setShowStudyModal={setShowStudyModal} toggleGR={toggleGeneralReview} />}
          {page === "performance" && <PerformancePage modules={modules} stats={stats} />}
          {page === "errors" && <ErrorsPage />}
          {page === "exams" && <ExamsPage exams={exams} setExams={setExams} />}
        </div>
      </div>

      {/* Study Modal */}
      {showStudyModal && selectedModule && (
        <div className="modal-bg" onClick={e => e.target === e.currentTarget && setShowStudyModal(false)}>
          <div className="modal">
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>Registrar Estudo</h2>
            <p style={{ fontSize: 13, color: "#888", marginBottom: 20 }}>{selectedModule.name}</p>
            
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>Data</label>
                <input type="date" className="input" value={studyForm.date} onChange={e => setStudyForm(p => ({...p, date: e.target.value}))} />
              </div>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>Questões feitas</label>
                <input type="number" className="input" placeholder="Ex: 30" value={studyForm.questions} onChange={e => setStudyForm(p => ({...p, questions: e.target.value}))} />
              </div>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>% de acertos</label>
                <input type="number" className="input" placeholder="Ex: 75" min="0" max="100" value={studyForm.accuracy} onChange={e => setStudyForm(p => ({...p, accuracy: e.target.value}))} />
              </div>
            </div>
            
            <div style={{ display: "flex", gap: 10, marginTop: 22 }}>
              <button className="btn btn-primary" style={{ flex: 1 }} onClick={registerStudy}>Registrar</button>
              <button className="btn btn-ghost" style={{ flex: 1 }} onClick={() => setShowStudyModal(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================
// HOME PAGE
// ============================================================
function HomePage({ stats, modules, setPage, setSelectedModule, setShowStudyModal, toggleGeneralReview, todayDone, setTodayDone, studyLog }) {
  const today = new Date(); today.setHours(0,0,0,0);
  const tomorrow = addDays(today, 1);

  const grToday = modules.flatMap(m => (m.generalReviews||[]).filter(r => {
    const d = new Date(r.date); d.setHours(0,0,0,0);
    return r.status === "pendente" && d <= today;
  }).map(r => ({...r, moduleName: m.name, moduleId: m.id})));

  const daysLeft = Math.max(0, daysFromNow(EXAM_DATE));
  const pct = Math.min(100, Math.round((todayDone / DAILY_GOAL) * 100));

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 26, fontFamily: "'DM Serif Display', serif", color: "#1a1a2e" }}>Olá! 👩‍⚕️</h1>
        <p style={{ color: "#888", marginTop: 4 }}>Prova em <strong style={{color:"#6366f1"}}>{daysLeft} dias</strong> · 15 nov 2026</p>
      </div>

      {/* Véspera Banner */}
      {stats.vesp && (
        <div style={{ background: "linear-gradient(135deg,#dc2626,#b91c1c)", color:"#fff", borderRadius: 14, padding: "16px 22px", marginBottom: 20, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div>
            <div style={{ fontSize: 16, fontWeight: 800 }}>🔴 MODO VÉSPERA ATIVADO</div>
            <div style={{ fontSize: 13, opacity: .85, marginTop: 3 }}>
              Faltam {daysFromNow(EXAM_DATE)} dias — o sistema agora foca apenas em revisão dos temas mais importantes com menor desempenho. Sem conteúdo novo!
            </div>
          </div>
          <div style={{ fontSize: 40, flexShrink: 0, marginLeft: 16 }}>🚨</div>
        </div>
      )}

      {/* Stats Row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 24 }}>
        {[
          { label: "Questões feitas", value: stats.totalQ.toLocaleString(), icon: "✏️", color: "#6366f1" },
          { label: "Revisões feitas", value: stats.totalRev, icon: "🔁", color: "#10b981" },
          { label: "Módulos estudados", value: `${stats.studied}/${modules.length}`, icon: "📚", color: "#f59e0b" },
          { label: "Acertos globais", value: stats.globalAccuracy ? `${stats.globalAccuracy}%` : "—", icon: "🎯", color: "#ec4899" },
        ].map(s => (
          <div key={s.label} className="card" style={{ padding: 18 }}>
            <div style={{ fontSize: 22, marginBottom: 8 }}>{s.icon}</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 12, color: "#888", marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Streak + Heatmap */}
      <div className="card" style={{ padding: 20, marginBottom: 20, display: "flex", gap: 32, alignItems: "flex-start", flexWrap: "wrap" }}>
        <div style={{ flexShrink: 0 }}>
          <div style={{ fontSize: 12, color: "#888", marginBottom: 4 }}>🔥 Sequência atual</div>
          <div style={{ fontSize: 40, fontWeight: 800, color: calcStreak(studyLog) >= 7 ? "#f59e0b" : "#6366f1", lineHeight: 1 }}>
            {calcStreak(studyLog)}<span style={{ fontSize: 16, fontWeight: 400, color: "#aaa" }}> dias</span>
          </div>
          <div style={{ fontSize: 11, color: "#aaa", marginTop: 4 }}>
            {calcStreak(studyLog) === 0 ? "Estude hoje para começar!" : calcStreak(studyLog) >= 7 ? "🏆 Incrível! Continue assim!" : "Continue estudando!"}
          </div>
        </div>
        <div style={{ flex: 1, minWidth: 200 }}>
          <div style={{ fontSize: 12, color: "#888", marginBottom: 8 }}>📅 Histórico de estudos (18 semanas)</div>
          <HeatMap studyLog={studyLog} />
        </div>
      </div>

      {/* Meta diária */}
      <div className="card" style={{ padding: 20, marginBottom: 24, background: pct >= 100 ? "linear-gradient(135deg,#10b981,#059669)" : "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)", color: "#fff" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <div>
            <div style={{ fontSize: 13, opacity: .8 }}>Meta diária</div>
            <div style={{ fontSize: 28, fontWeight: 700 }}>{todayDone} / {DAILY_GOAL} questões</div>
            <div style={{ fontSize: 12, opacity: .7, marginTop: 2 }}>
              {pct >= 100 ? "✅ Meta atingida!" : `Faltam ${DAILY_GOAL - todayDone} questões`}
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 36, fontWeight: 800 }}>{pct}%</div>
            <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
              <button onClick={() => setTodayDone(Math.max(0, todayDone - 5))} style={{ background: "rgba(255,255,255,.2)", border: "none", color: "#fff", borderRadius: 8, padding: "4px 10px", cursor: "pointer", fontWeight: 700 }}>−5</button>
              <button onClick={() => setTodayDone(todayDone + 10)} style={{ background: "rgba(255,255,255,.25)", border: "none", color: "#fff", borderRadius: 8, padding: "4px 10px", cursor: "pointer", fontWeight: 700 }}>+10</button>
              <button onClick={() => setTodayDone(todayDone + 20)} style={{ background: "rgba(255,255,255,.25)", border: "none", color: "#fff", borderRadius: 8, padding: "4px 10px", cursor: "pointer", fontWeight: 700 }}>+20</button>
            </div>
          </div>
        </div>
        <div style={{ height: 8, background: "rgba(255,255,255,.25)", borderRadius: 4, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${pct}%`, background: "#fff", borderRadius: 4, transition: "width .4s" }} />
        </div>
      </div>

      {/* PLANO DO DIA */}
      <div className="card" style={{ padding: 22, marginBottom: 24 }}>
        <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 6, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span>{stats.vesp ? "🔴 Plano de hoje — Modo Véspera" : "📋 Plano de hoje — revisões"}</span>
          <span style={{ fontSize: 12, color: "#888", fontWeight: 400 }}>
            {stats.plan?.reduce((s,m) => s + m.suggestedQuestions, 0) || 0} questões sugeridas
          </span>
        </div>
        <p style={{ fontSize: 12, color: "#aaa", marginBottom: 16 }}>
          {stats.vesp ? "Apenas revisão — temas mais prevalentes com menor acerto primeiro" : "Baseado em incidência nas provas + seu desempenho + tempo sem contato"}
        </p>

        {(!stats.plan || stats.plan.length === 0) && (
          <div style={{ color: "#aaa", fontSize: 13, textAlign: "center", padding: "20px 0" }}>
            Nenhuma revisão programada para hoje. Registre seus primeiros estudos nos Módulos!
          </div>
        )}

        {(stats.plan || []).map((m, i) => {
          const maxScore = modules[0]?.prevalenceScore || 1;
          const prevPct = Math.round((m.prevalenceScore / maxScore) * 100);
          const prevLabel = prevPct > 65 ? "Alta" : prevPct > 35 ? "Média" : "Baixa";
          const prevColor = prevPct > 65 ? "#dc2626" : prevPct > 35 ? "#f59e0b" : "#6366f1";

          return (
            <div key={m.id} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 0", borderBottom: "1px solid #f5f5f8" }}>
              {/* Priority number */}
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: i === 0 ? "#fef2f2" : "#f5f5fb", color: i === 0 ? "#dc2626" : "#6366f1", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 13, flexShrink: 0 }}>
                {i + 1}
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 14, fontWeight: 700 }}>{m.name}</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: prevColor, background: prevColor + "18", padding: "2px 8px", borderRadius: 20 }}>
                    {prevLabel} incidência
                  </span>
                  {m.avgAccuracy > 0 && (
                    <span style={{ fontSize: 11, color: m.avgAccuracy < 60 ? "#dc2626" : m.avgAccuracy >= 80 ? "#10b981" : "#f59e0b", fontWeight: 600 }}>
                      {m.avgAccuracy}% acertos
                    </span>
                  )}
                </div>
                <div style={{ display: "flex", gap: 6, marginTop: 5, flexWrap: "wrap" }}>
                  {(m.reasons || []).map(r => (
                    <span key={r} style={{ fontSize: 11, color: "#888", background: "#f5f5f8", padding: "2px 8px", borderRadius: 20 }}>{r}</span>
                  ))}
                </div>
              </div>

              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div style={{ fontSize: 20, fontWeight: 800, color: "#6366f1" }}>{m.suggestedQuestions}</div>
                <div style={{ fontSize: 11, color: "#888" }}>questões</div>
              </div>

              <button className="btn btn-primary btn-sm" onClick={() => { setSelectedModule(m); setShowStudyModal(true); }}>
                Registrar
              </button>
            </div>
          );
        })}
      </div>

      {/* Alertas: negligenciados */}
      {(stats.neglected || []).length > 0 && (
        <div className="card" style={{ padding: 20, marginBottom: 20, borderLeft: "4px solid #f59e0b" }}>
          <div style={{ fontWeight: 700, marginBottom: 10, color: "#b45309" }}>
            ⏰ Temas importantes sem contato recente
          </div>
          {stats.neglected.slice(0,4).map(m => {
            const days = daysSinceLastContact(m);
            return (
              <div key={m.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: "1px solid #fef3c7" }}>
                <div>
                  <span style={{ fontSize: 13, fontWeight: 600 }}>{m.name}</span>
                  <span style={{ fontSize: 12, color: "#b45309", marginLeft: 8 }}>há {days} dias sem revisar</span>
                </div>
                <button className="btn btn-sm" style={{ background: "#fef3c7", color: "#b45309", border: "none", cursor: "pointer", fontWeight: 600 }} onClick={() => { setSelectedModule(m); setShowStudyModal(true); }}>
                  Revisar
                </button>
              </div>
            );
          })}
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {/* Revisões gerais */}
        <div className="card" style={{ padding: 20 }}>
          <div style={{ fontWeight: 700, marginBottom: 14 }}>📖 Revisões Gerais Pendentes</div>
          {grToday.length === 0 && <div style={{ color: "#aaa", fontSize: 13 }}>Nenhuma revisão geral pendente.</div>}
          {grToday.slice(0,5).map(r => (
            <div key={r.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #f5f5f8" }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{r.moduleName}</div>
                <div style={{ fontSize: 11, color: "#888" }}>Revisão Geral</div>
              </div>
              <button className="btn btn-primary btn-sm" style={{ background: "#10b981" }} onClick={() => toggleGeneralReview(r.moduleId, r.id)}>Marcar feita</button>
            </div>
          ))}
        </div>

        {/* Progresso total */}
        <div className="card" style={{ padding: 20 }}>
          <div style={{ fontWeight: 700, marginBottom: 14 }}>📊 Progresso até a prova</div>
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 6 }}>
              <span>Questões</span>
              <span style={{ fontWeight: 700 }}>{stats.totalQ.toLocaleString()} / {TARGET_QUESTIONS.toLocaleString()}</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${Math.min(100,(stats.totalQ/TARGET_QUESTIONS)*100)}%`, background: "#6366f1" }} />
            </div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 6 }}>
              <span>Módulos concluídos</span>
              <span style={{ fontWeight: 700 }}>{stats.concluded} / {modules.length}</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${Math.round((stats.concluded/modules.length)*100)}%`, background: "#10b981" }} />
            </div>
          </div>
          <button className="btn" style={{ width: "100%", marginTop: 8, background: "#fef2f2", color: "#dc2626", border: "none", padding: "12px", borderRadius: 10, fontWeight: 700, cursor: "pointer", fontSize: 14 }} onClick={() => setPage("errors")}>
            📝 Caderno de Erros
          </button>
        </div>
      </div>
    </div>
  );
}


// ============================================================
// STREAK & HEATMAP HELPERS
// ============================================================
function calcStreak(studyLog) {
  if (!studyLog || studyLog.length === 0) return 0;
  const sorted = [...new Set(studyLog)].sort().reverse();
  const today = new Date().toISOString().slice(0,10);
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0,10);
  if (sorted[0] !== today && sorted[0] !== yesterday) return 0;
  let streak = 0;
  let check = new Date(sorted[0]);
  for (let i = 0; i < sorted.length; i++) {
    const d = new Date(sorted[i]);
    const expected = new Date(check);
    expected.setDate(expected.getDate() - i);
    if (d.toISOString().slice(0,10) === expected.toISOString().slice(0,10)) streak++;
    else break;
  }
  return streak;
}

function HeatMap({ studyLog }) {
  const logSet = new Set(studyLog || []);
  const weeks = 18;
  const days = [];
  const now = new Date(); now.setHours(0,0,0,0);
  // Start from (weeks*7) days ago, aligned to Sunday
  const startOffset = (weeks * 7) - 1;
  for (let i = startOffset; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    days.push(d.toISOString().slice(0,10));
  }
  // Group into columns of 7
  const cols = [];
  for (let c = 0; c < weeks; c++) cols.push(days.slice(c*7, c*7+7));

  const monthLabels = [];
  cols.forEach((col, ci) => {
    const first = new Date(col[0]);
    if (ci === 0 || new Date(cols[ci-1][0]).getMonth() !== first.getMonth()) {
      monthLabels.push({ ci, label: first.toLocaleDateString("pt-BR",{month:"short"}) });
    }
  });

  return (
    <div>
      <div style={{ display: "flex", gap: 0, position: "relative" }}>
        {/* Month labels */}
        <div style={{ display: "flex", marginBottom: 4, marginLeft: 0 }}>
          {cols.map((col, ci) => {
            const ml = monthLabels.find(m => m.ci === ci);
            return <div key={ci} style={{ width: 14, fontSize: 9, color: "#aaa", flexShrink: 0 }}>{ml ? ml.label : ""}</div>;
          })}
        </div>
      </div>
      <div style={{ display: "flex", gap: 2 }}>
        {cols.map((col, ci) => (
          <div key={ci} style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {col.map(day => {
              const studied = logSet.has(day);
              const isToday = day === new Date().toISOString().slice(0,10);
              return (
                <div key={day} title={day} style={{
                  width: 12, height: 12, borderRadius: 3, flexShrink: 0,
                  background: studied ? "#6366f1" : "#e8e8f0",
                  border: isToday ? "1.5px solid #6366f1" : "none",
                  opacity: studied ? 1 : 0.5,
                }} />
              );
            })}
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 4, alignItems: "center", marginTop: 6 }}>
        <div style={{ width: 10, height: 10, borderRadius: 2, background: "#e8e8f0" }} />
        <span style={{ fontSize: 10, color: "#aaa" }}>Sem estudo</span>
        <div style={{ width: 10, height: 10, borderRadius: 2, background: "#6366f1", marginLeft: 8 }} />
        <span style={{ fontSize: 10, color: "#aaa" }}>Estudou</span>
      </div>
    </div>
  );
}

// ============================================================
// MODULES PAGE
// ============================================================
function ModulesPage({ modules, filterArea, setFilterArea, filterStatus, setFilterStatus, searchQ, setSearchQ, setSelectedModule, stats }) {
  const statusColors = { "não estudado": "#d1d5db", "em andamento": "#f59e0b", "concluído": "#10b981" };
  
  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontFamily: "'DM Serif Display', serif" }}>Módulos</h1>
        <p style={{ color: "#888", fontSize: 13, marginTop: 4 }}>Ordenados por prevalência nas provas</p>
      </div>
      
      {/* Filters */}
      <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
        <input className="input" style={{ maxWidth: 200 }} placeholder="Buscar módulo..." value={searchQ} onChange={e => setSearchQ(e.target.value)} />
        <select className="input" style={{ maxWidth: 200 }} value={filterArea} onChange={e => setFilterArea(e.target.value)}>
          <option>Todas</option>
          {GRANDES_AREAS.map(a => <option key={a}>{a}</option>)}
        </select>
        <select className="input" style={{ maxWidth: 160 }} value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
          <option>Todos</option>
          <option value="não estudado">Não estudado</option>
          <option value="em andamento">Em andamento</option>
          <option value="concluído">Concluído</option>
        </select>
      </div>
      
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 14 }}>
        {modules.map((m, i) => {
          const isNotStudied = m.status === "não estudado";
          const today = new Date(); today.setHours(0,0,0,0);
          const isOverdue = m.nextReview && new Date(m.nextReview) < today;
          const isDueToday = m.nextReview && new Date(m.nextReview) >= today && new Date(m.nextReview) < addDays(today, 1);
          
          return (
            <div key={m.id} className="module-card" style={{ opacity: isNotStudied ? 0.65 : 1 }} onClick={() => setSelectedModule(m)}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, lineHeight: 1.3 }}>{m.name}</div>
                  <div style={{ fontSize: 11, color: AREA_COLORS[m.area] || "#888", marginTop: 3, fontWeight: 600 }}>{m.area}</div>
                </div>
                <div style={{ marginLeft: 8, textAlign: "right" }}>
                  <span className="status-dot" style={{ background: statusColors[m.status] }} />
                </div>
              </div>
              
              {!isNotStudied && (
                <div>
                  <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                    <span style={{ fontSize: 11, color: "#888" }}>{m.totalQuestions} questões</span>
                    <span style={{ fontSize: 11, color: m.avgAccuracy >= 70 ? "#10b981" : "#f59e0b" }}>{m.avgAccuracy}% acertos</span>
                  </div>
                  {isOverdue && <span className="badge" style={{ background: "#fef2f2", color: "#dc2626", fontSize: 11 }}>⚠ Atrasado</span>}
                  {isDueToday && <span className="badge" style={{ background: "#f0fdf4", color: "#16a34a", fontSize: 11 }}>📅 Hoje</span>}
                  {!isOverdue && !isDueToday && m.nextReview && <span style={{ fontSize: 11, color: "#888" }}>Próx: {formatDate(m.nextReview)}</span>}
                </div>
              )}
              
              {!isNotStudied && (
                <div style={{ marginTop: 10 }}>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${m.avgAccuracy}%`, background: m.avgAccuracy >= 70 ? "#10b981" : "#f59e0b" }} />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================
// MODULE DETAIL PAGE
// ============================================================
function ModuleDetailPage({ module: m, onBack, onStudy, toggleGR, setSelectedModule }) {
  useEffect(() => { setSelectedModule(m); }, [m]);
  
  if (!m) return null;
  const statusColors = { "não estudado": "#d1d5db", "em andamento": "#f59e0b", "concluído": "#10b981" };
  const statusLabels = { "não estudado": "Não estudado", "em andamento": "Em andamento", "concluído": "Concluído" };
  
  return (
    <div>
      <button className="btn btn-ghost btn-sm" style={{ marginBottom: 20 }} onClick={onBack}>← Voltar</button>
      
      <div className="card" style={{ padding: 24, marginBottom: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <h1 style={{ fontSize: 22, fontFamily: "'DM Serif Display', serif" }}>{m.name}</h1>
            <div style={{ fontSize: 13, color: AREA_COLORS[m.area], fontWeight: 600, marginTop: 4 }}>{m.area}</div>
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <span className="tag" style={{ background: AREA_BG[m.area] || "#f5f5f8", color: statusColors[m.status] }}>● {statusLabels[m.status]}</span>
            <button className="btn btn-primary" onClick={onStudy}>+ Registrar estudo</button>
          </div>
        </div>
        
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginTop: 20 }}>
          {[
            { label: "Questões", value: m.totalQuestions },
            { label: "Revisões", value: m.history.length },
            { label: "Acertos", value: m.avgAccuracy ? `${m.avgAccuracy}%` : "—" },
            { label: "Próxima revisão", value: formatDate(m.nextReview) },
          ].map(s => (
            <div key={s.label} style={{ background: "#f8f8fb", borderRadius: 10, padding: 14 }}>
              <div style={{ fontSize: 18, fontWeight: 700, color: "#6366f1" }}>{s.value || "—"}</div>
              <div style={{ fontSize: 12, color: "#888" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
      
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {/* Temas */}
        <div className="card" style={{ padding: 20 }}>
          <h3 style={{ fontWeight: 700, marginBottom: 14 }}>📚 Temas ({m.topics.length})</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 6, maxHeight: 300, overflowY: "auto" }}>
            {m.topics.map(t => (
              <div key={t} style={{ fontSize: 13, padding: "6px 10px", background: "#f8f8fb", borderRadius: 8 }}>{t}</div>
            ))}
          </div>
        </div>
        
        {/* Revisões Gerais */}
        <div className="card" style={{ padding: 20 }}>
          <h3 style={{ fontWeight: 700, marginBottom: 14 }}>📖 Revisões Gerais</h3>
          {(!m.generalReviews || m.generalReviews.length === 0) && (
            <div style={{ color: "#aaa", fontSize: 13 }}>Revisões gerais serão geradas após o primeiro estudo.</div>
          )}
          {(m.generalReviews || []).map((r, i) => (
            <div key={r.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #f5f5f8" }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600 }}>Revisão Geral {i+1}</div>
                <div style={{ fontSize: 11, color: "#888" }}>{formatDate(r.date)}</div>
              </div>
              <button className="btn btn-sm" style={{ background: r.status === "feita" ? "#ecfdf5" : "#f5f5fb", color: r.status === "feita" ? "#10b981" : "#888", border: "none" }} onClick={() => toggleGR(m.id, r.id)}>
                {r.status === "feita" ? "✓ Feita" : "Pendente"}
              </button>
            </div>
          ))}
        </div>
        
        {/* Histórico */}
        <div className="card" style={{ padding: 20, gridColumn: "1 / -1" }}>
          <h3 style={{ fontWeight: 700, marginBottom: 14 }}>🕒 Histórico completo</h3>
          {m.history.length === 0 && <div style={{ color: "#aaa", fontSize: 13 }}>Nenhum estudo registrado ainda.</div>}
          <div style={{ overflowX: "auto" }}>
            {m.history.length > 0 && (
              <table style={{ width: "100%", fontSize: 13, borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ color: "#888", textAlign: "left" }}>
                    {["Sessão", "Data", "Questões", "Acertos"].map(h => <th key={h} style={{ padding: "8px 12px", fontWeight: 600, borderBottom: "1px solid #f0f0f8" }}>{h}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {m.history.map((h, i) => (
                    <tr key={i}>
                      <td style={{ padding: "10px 12px" }}>{h.label || `Revisão ${i+1}`}</td>
                      <td style={{ padding: "10px 12px", color: "#888" }}>{formatDate(h.date)}</td>
                      <td style={{ padding: "10px 12px" }}>{h.questions}</td>
                      <td style={{ padding: "10px 12px" }}>
                        <span style={{ color: h.accuracy >= 70 ? "#10b981" : "#f59e0b", fontWeight: 700 }}>{h.accuracy}%</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// SCHEDULE PAGE
// ============================================================
function SchedulePage({ modules, setPage, setSelectedModule, setShowStudyModal, toggleGR }) {
  const today = new Date(); today.setHours(0,0,0,0);
  const overdue = modules.filter(m => m.nextReview && new Date(m.nextReview) < today && m.status !== "não estudado")
    .sort((a,b) => new Date(a.nextReview) - new Date(b.nextReview));
  const dueToday = modules.filter(m => m.nextReview && new Date(m.nextReview) >= today && new Date(m.nextReview) < addDays(today,1));
  const upcoming = modules.filter(m => m.nextReview && new Date(m.nextReview) >= addDays(today,1))
    .sort((a,b) => new Date(a.nextReview) - new Date(b.nextReview)).slice(0, 20);
  
  const grPending = modules.flatMap(m => (m.generalReviews||[]).filter(r => r.status === "pendente").map(r => ({...r, moduleName: m.name, moduleId: m.id})))
    .sort((a,b) => new Date(a.date)-new Date(b.date));
  
  function openStudy(m) {
    setSelectedModule(m);
    setShowStudyModal(true);
  }
  
  const Section = ({ title, items, color = "#6366f1", renderItem }) => (
    <div className="card" style={{ padding: 20, marginBottom: 20 }}>
      <div style={{ fontWeight: 700, marginBottom: 16, display: "flex", justifyContent: "space-between" }}>
        <span style={{ color }}>{title}</span>
        <span style={{ fontSize: 13, color: "#888" }}>{items.length}</span>
      </div>
      {items.length === 0 && <div style={{ color: "#aaa", fontSize: 13 }}>Nenhum item.</div>}
      {items.map(renderItem)}
    </div>
  );
  
  return (
    <div>
      <h1 style={{ fontSize: 24, fontFamily: "'DM Serif Display', serif", marginBottom: 24 }}>Agenda de Revisões</h1>
      
      <Section title="⚠️ Revisões Atrasadas" items={overdue} color="#dc2626" renderItem={m => (
        <div key={m.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px solid #f5f5f8" }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600 }}>{m.name}</div>
            <div style={{ fontSize: 12, color: "#dc2626" }}>Deveria ter sido {formatDate(m.nextReview)}</div>
          </div>
          <button className="btn btn-primary btn-sm" style={{ background: "#dc2626" }} onClick={() => openStudy(m)}>Revisar agora</button>
        </div>
      )} />
      
      <Section title="📅 Para hoje" items={dueToday} color="#10b981" renderItem={m => (
        <div key={m.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px solid #f5f5f8" }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600 }}>{m.name}</div>
            <div style={{ fontSize: 12, color: "#888" }}>{m.area} · {m.avgAccuracy}% acertos</div>
          </div>
          <button className="btn btn-primary btn-sm" onClick={() => openStudy(m)}>Estudar</button>
        </div>
      )} />
      
      <Section title="📖 Revisões Gerais Pendentes" items={grPending} color="#8b5cf6" renderItem={r => (
        <div key={r.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px solid #f5f5f8" }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600 }}>{r.moduleName}</div>
            <div style={{ fontSize: 12, color: new Date(r.date) < today ? "#dc2626" : "#888" }}>
              {new Date(r.date) < today ? "⚠ Atrasada" : "Pendente"} · {formatDate(r.date)}
            </div>
          </div>
          <button className="btn btn-sm" style={{ background: "#f5f0ff", color: "#8b5cf6", border: "none", cursor: "pointer", fontWeight: 600, borderRadius: 8, padding: "6px 14px" }} onClick={() => toggleGR(r.moduleId, r.id)}>
            Marcar feita
          </button>
        </div>
      )} />
      
      <Section title="🔜 Próximas revisões" items={upcoming} renderItem={m => (
        <div key={m.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px solid #f5f5f8" }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600 }}>{m.name}</div>
            <div style={{ fontSize: 12, color: "#888" }}>{formatDate(m.nextReview)}</div>
          </div>
          <span style={{ fontSize: 13, color: "#6366f1", fontWeight: 600 }}>em {daysFromNow(new Date(m.nextReview))}d</span>
        </div>
      )} />
    </div>
  );
}

// ============================================================
// PERFORMANCE PAGE
// ============================================================
function PerformancePage({ modules, stats }) {
  const studied = modules.filter(m => m.status !== "não estudado" && m.avgAccuracy > 0);
  
  const byArea = GRANDES_AREAS.map(area => {
    const mods = studied.filter(m => m.area === area);
    const avg = mods.length ? Math.round(mods.reduce((s,m) => s+m.avgAccuracy,0)/mods.length) : 0;
    const total = mods.reduce((s,m) => s+m.totalQuestions,0);
    return { area, avg, total, count: mods.length };
  });
  
  const strongest = [...studied].sort((a,b) => b.avgAccuracy-a.avgAccuracy).slice(0,5);
  const weakest = [...studied].sort((a,b) => a.avgAccuracy-b.avgAccuracy).slice(0,5);
  
  const daysLeft = Math.max(0, daysFromNow(EXAM_DATE));
  const totalDays = 365;
  const progress = Math.min(100, Math.round((1 - daysLeft/totalDays)*100));
  
  return (
    <div>
      <h1 style={{ fontSize: 24, fontFamily: "'DM Serif Display', serif", marginBottom: 24 }}>Desempenho</h1>
      
      {/* Global */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 24 }}>
        <div className="card" style={{ padding: 20, background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "#fff" }}>
          <div style={{ fontSize: 13, opacity: .8 }}>Acertos globais</div>
          <div style={{ fontSize: 36, fontWeight: 700 }}>{stats.globalAccuracy}%</div>
          <div style={{ marginTop: 10, height: 4, background: "rgba(255,255,255,.3)", borderRadius: 2 }}>
            <div style={{ height: "100%", width: `${stats.globalAccuracy}%`, background: "#fff", borderRadius: 2 }} />
          </div>
        </div>
        <div className="card" style={{ padding: 20 }}>
          <div style={{ fontSize: 13, color: "#888" }}>Questões totais</div>
          <div style={{ fontSize: 36, fontWeight: 700, color: "#6366f1" }}>{stats.totalQ.toLocaleString()}</div>
          <div style={{ fontSize: 12, color: "#aaa" }}>de {TARGET_QUESTIONS.toLocaleString()} meta</div>
          <div style={{ marginTop: 10 }} className="progress-bar">
            <div className="progress-fill" style={{ width: `${Math.min(100,(stats.totalQ/TARGET_QUESTIONS)*100)}%`, background: "#6366f1" }} />
          </div>
        </div>
        <div className="card" style={{ padding: 20 }}>
          <div style={{ fontSize: 13, color: "#888" }}>Progresso geral</div>
          <div style={{ fontSize: 36, fontWeight: 700, color: "#10b981" }}>{Math.round((stats.studied/modules.length)*100)}%</div>
          <div style={{ fontSize: 12, color: "#aaa" }}>{stats.studied} de {modules.length} módulos</div>
        </div>
      </div>
      
      {/* Por área */}
      <div className="card" style={{ padding: 20, marginBottom: 20 }}>
        <h3 style={{ fontWeight: 700, marginBottom: 16 }}>Por Grande Área</h3>
        {byArea.map(a => (
          <div key={a.area} style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: AREA_COLORS[a.area] }}>{a.area}</span>
              <span style={{ fontSize: 13, color: "#888" }}>{a.avg}% · {a.total} questões · {a.count} módulos</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${a.avg}%`, background: AREA_COLORS[a.area] }} />
            </div>
          </div>
        ))}
      </div>
      
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <div className="card" style={{ padding: 20 }}>
          <h3 style={{ fontWeight: 700, marginBottom: 14, color: "#10b981" }}>💪 Pontos fortes</h3>
          {strongest.length === 0 && <div style={{ color: "#aaa", fontSize: 13 }}>Sem dados ainda.</div>}
          {strongest.map(m => (
            <div key={m.id} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #f5f5f8" }}>
              <div style={{ fontSize: 13 }}>{m.name}</div>
              <span style={{ fontWeight: 700, color: "#10b981", fontSize: 13 }}>{m.avgAccuracy}%</span>
            </div>
          ))}
        </div>
        <div className="card" style={{ padding: 20 }}>
          <h3 style={{ fontWeight: 700, marginBottom: 14, color: "#dc2626" }}>⚠️ Precisam de atenção</h3>
          {weakest.length === 0 && <div style={{ color: "#aaa", fontSize: 13 }}>Sem dados ainda.</div>}
          {weakest.map(m => (
            <div key={m.id} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #f5f5f8" }}>
              <div style={{ fontSize: 13 }}>{m.name}</div>
              <span style={{ fontWeight: 700, color: "#dc2626", fontSize: 13 }}>{m.avgAccuracy}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// ERRORS PAGE — caderno por grande área
// ============================================================

const NOTEBOOK_AREAS = [
  "Clínica Médica",
  "Clínica Cirúrgica",
  "Pediatria",
  "Ginecologia e Obstetrícia",
  "Preventiva & Social",
];

const AREA_ICONS = {
  "Clínica Médica": "🫀",
  "Clínica Cirúrgica": "🔪",
  "Pediatria": "🧸",
  "Ginecologia e Obstetrícia": "🌸",
  "Preventiva & Social": "📋",
};

function Toolbar({ onAction }) {
  const tools = [
    { label: "N", title: "Negrito", cmd: "bold", style: { fontWeight: 800 } },
    { label: "I", title: "Itálico", cmd: "italic", style: { fontStyle: "italic" } },
    { label: "S", title: "Sublinhado", cmd: "underline", style: { textDecoration: "underline" } },
    { label: "H1", title: "Título", cmd: "h1", style: { fontSize: 12 } },
    { label: "H2", title: "Subtítulo", cmd: "h2", style: { fontSize: 12 } },
    { label: "• Lista", title: "Lista com marcadores", cmd: "ul", style: { fontSize: 11 } },
    { label: "1. Lista", title: "Lista numerada", cmd: "ol", style: { fontSize: 11 } },
    { label: "—", title: "Linha divisória", cmd: "hr", style: {} },
    { label: "🔖 Revisão", title: "Marcar para revisão", cmd: "mark", style: { fontSize: 11 } },
    { label: "🖼", title: "Inserir imagem", cmd: "image", style: { fontSize: 14 } },
  ];

  return (
    <div style={{ display: "flex", gap: 4, flexWrap: "wrap", padding: "10px 14px", background: "#f8f8fb", borderBottom: "1.5px solid #ebebf3", borderRadius: "12px 12px 0 0" }}>
      {tools.map(t => (
        <button
          key={t.cmd}
          title={t.title}
          onMouseDown={e => { e.preventDefault(); onAction(t.cmd); }}
          style={{ ...t.style, background: "#fff", border: "1.5px solid #e5e5eb", borderRadius: 6, padding: "4px 10px", cursor: "pointer", fontFamily: "inherit", color: "#333", transition: "all .1s" }}
          onMouseEnter={e => e.currentTarget.style.borderColor = "#6366f1"}
          onMouseLeave={e => e.currentTarget.style.borderColor = "#e5e5eb"}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

function NotebookEditor({ area, content, onChange }) {
  const editorRef = React.useRef(null);
  const fileInputRef = React.useRef(null);

  // Initialize content
  React.useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== content) {
      editorRef.current.innerHTML = content || `<p><br></p>`;
    }
  }, [area]);

  function handleInput() {
    if (editorRef.current) onChange(editorRef.current.innerHTML);
  }

  function handleAction(cmd) {
    if (!editorRef.current) return;
    editorRef.current.focus();

    if (cmd === "bold") document.execCommand("bold", false, null);
    else if (cmd === "italic") document.execCommand("italic", false, null);
    else if (cmd === "underline") document.execCommand("underline", false, null);
    else if (cmd === "h1") document.execCommand("formatBlock", false, "h2");
    else if (cmd === "h2") document.execCommand("formatBlock", false, "h3");
    else if (cmd === "ul") document.execCommand("insertUnorderedList", false, null);
    else if (cmd === "ol") document.execCommand("insertOrderedList", false, null);
    else if (cmd === "hr") document.execCommand("insertHTML", false, "<hr style='border:none;border-top:2px solid #e0e0f0;margin:16px 0'/>");
    else if (cmd === "mark") {
      const sel = window.getSelection();
      if (sel && sel.toString().length > 0) {
        document.execCommand("insertHTML", false,
          `<mark style="background:#fef3c7;padding:2px 4px;border-radius:3px;border-left:3px solid #f59e0b">🔖 ${sel.toString()}</mark>`
        );
      } else {
        document.execCommand("insertHTML", false,
          `<mark style="background:#fef3c7;padding:2px 4px;border-radius:3px;border-left:3px solid #f59e0b">🔖 </mark>`
        );
      }
    }
    else if (cmd === "image") fileInputRef.current?.click();

    setTimeout(() => { if (editorRef.current) onChange(editorRef.current.innerHTML); }, 50);
  }

  function handleImageUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      editorRef.current?.focus();
      document.execCommand("insertHTML", false,
        `<div style="margin:10px 0"><img src="${ev.target.result}" style="max-width:100%;border-radius:8px;border:1.5px solid #e5e5eb" /></div>`
      );
      setTimeout(() => { if (editorRef.current) onChange(editorRef.current.innerHTML); }, 50);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  }

  function handlePaste(e) {
    const items = e.clipboardData?.items;
    if (!items) return;
    for (const item of items) {
      if (item.type.startsWith("image/")) {
        e.preventDefault();
        const file = item.getAsFile();
        const reader = new FileReader();
        reader.onload = ev => {
          document.execCommand("insertHTML", false,
            `<div style="margin:10px 0"><img src="${ev.target.result}" style="max-width:100%;border-radius:8px;border:1.5px solid #e5e5eb" /></div>`
          );
          setTimeout(() => { if (editorRef.current) onChange(editorRef.current.innerHTML); }, 50);
        };
        reader.readAsDataURL(file);
      }
    }
  }

  return (
    <div style={{ border: "1.5px solid #ebebf3", borderRadius: 12, overflow: "hidden", display: "flex", flexDirection: "column", height: "calc(100vh - 280px)" }}>
      <Toolbar onAction={handleAction} />
      <input ref={fileInputRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleImageUpload} />
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        onPaste={handlePaste}
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "20px 24px",
          outline: "none",
          fontSize: 14,
          lineHeight: 1.8,
          color: "#1a1a2e",
          fontFamily: "'DM Sans', system-ui, sans-serif",
        }}
      />
      <style>{`
        [contenteditable] h2 { font-size: 20px; font-weight: 700; margin: 16px 0 8px; color: #1a1a2e; }
        [contenteditable] h3 { font-size: 16px; font-weight: 600; margin: 14px 0 6px; color: #374151; }
        [contenteditable] ul { padding-left: 22px; margin: 8px 0; }
        [contenteditable] ol { padding-left: 22px; margin: 8px 0; }
        [contenteditable] li { margin: 4px 0; }
        [contenteditable] p { margin: 6px 0; }
        [contenteditable] img { max-width: 100%; }
        [contenteditable]:empty:before { content: "Comece a escrever seus erros e anotações aqui..."; color: #bbb; pointer-events: none; }
      `}</style>
    </div>
  );
}

function ErrorsPage({ errors, setErrors, showErrorForm, setShowErrorForm, errorForm, setErrorForm, addError, modules }) {
  const [activeArea, setActiveArea] = useState("Clínica Médica");
  const [notebooks, setNotebooks] = useState(() => {
    try {
      const saved = localStorage.getItem("notebooks_v2");
      return saved ? JSON.parse(saved) : Object.fromEntries(NOTEBOOK_AREAS.map(a => [a, ""]));
    } catch(e) {
      return Object.fromEntries(NOTEBOOK_AREAS.map(a => [a, ""]));
    }
  });
  const [saved, setSaved] = useState(false);
  const saveTimer = React.useRef(null);

  function handleChange(html) {
    setNotebooks(prev => {
      const next = { ...prev, [activeArea]: html };
      clearTimeout(saveTimer.current);
      saveTimer.current = setTimeout(() => {
        try { localStorage.setItem("notebooks_v2", JSON.stringify(next)); setSaved(true); setTimeout(() => setSaved(false), 1500); } catch(e) {}
      }, 800);
      return next;
    });
  }

  // Count review marks per notebook
  function countMarks(html) {
    return (html.match(/🔖/g) || []).length;
  }

  function exportPDF() {
    const area = activeArea;
    const html = notebooks[area] || "<p>Caderno vazio.</p>";
    const win = window.open("", "_blank");
    win.document.write(`<!DOCTYPE html><html><head>
      <meta charset="utf-8"/>
      <title>Caderno de Erros — ${area}</title>
      <style>
        body { font-family: 'Georgia', serif; max-width: 820px; margin: 40px auto; padding: 0 40px; color: #1a1a2e; line-height: 1.8; }
        h1 { font-size: 26px; border-bottom: 2px solid #6366f1; padding-bottom: 10px; color: #6366f1; }
        h2 { font-size: 20px; color: #1a1a2e; margin-top: 28px; }
        h3 { font-size: 16px; color: #374151; }
        ul, ol { padding-left: 24px; }
        li { margin: 4px 0; }
        hr { border: none; border-top: 2px solid #e0e0f0; margin: 20px 0; }
        mark { background: #fef3c7; padding: 2px 5px; border-radius: 3px; border-left: 3px solid #f59e0b; }
        img { max-width: 100%; border-radius: 8px; margin: 10px 0; }
        .footer { margin-top: 60px; font-size: 11px; color: #aaa; border-top: 1px solid #eee; padding-top: 10px; }
      </style>
    </head><body>
      <h1>${area}</h1>
      <p style="color:#aaa;font-size:13px">Caderno de Erros · Exportado em ${new Date().toLocaleDateString("pt-BR")}</p>
      ${html}
      <div class="footer">Sistema de Estudos — Residência Médica · ${area}</div>
    </body></html>`);
    win.document.close();
    setTimeout(() => { win.focus(); win.print(); }, 400);
  }

  function exportAllPDF() {
    const parts = NOTEBOOK_AREAS.map(area => {
      const html = notebooks[area] || "";
      if (!html.replace(/<[^>]*>/g,"").trim()) return "";
      return `<div style="page-break-before:always">
        <h1 style="color:#6366f1;border-bottom:2px solid #6366f1;padding-bottom:10px">${area}</h1>
        ${html}
      </div>`;
    }).filter(Boolean);
    if (parts.length === 0) return;
    const win = window.open("", "_blank");
    win.document.write(`<!DOCTYPE html><html><head>
      <meta charset="utf-8"/>
      <title>Caderno de Erros Completo</title>
      <style>
        body { font-family: 'Georgia', serif; max-width: 820px; margin: 40px auto; padding: 0 40px; color: #1a1a2e; line-height: 1.8; }
        h1 { font-size: 24px; } h2 { font-size: 20px; margin-top: 24px; } h3 { font-size: 16px; }
        ul, ol { padding-left: 24px; } li { margin: 4px 0; }
        hr { border: none; border-top: 2px solid #e0e0f0; margin: 20px 0; }
        mark { background: #fef3c7; padding: 2px 5px; border-radius: 3px; border-left: 3px solid #f59e0b; }
        img { max-width: 100%; border-radius: 8px; margin: 10px 0; }
        .cover { text-align: center; padding: 80px 0; }
        @media print { div[style*="page-break"] { page-break-before: always; } }
      </style>
    </head><body>
      <div class="cover">
        <h1 style="font-size:32px;color:#6366f1">Caderno de Erros</h1>
        <p style="color:#888">Residência Médica · Exportado em ${new Date().toLocaleDateString("pt-BR")}</p>
      </div>
      ${parts.join("")}
    </body></html>`);
    win.document.close();
    setTimeout(() => { win.focus(); win.print(); }, 400);
  }

  return (
    <div style={{ display: "flex", height: "calc(100vh - 56px)", gap: 0 }}>

      {/* Area sidebar */}
      <div style={{ width: 210, flexShrink: 0, borderRight: "1.5px solid #ebebf3", padding: "20px 12px", display: "flex", flexDirection: "column", gap: 4, background: "#fafafa" }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "#aaa", textTransform: "uppercase", letterSpacing: 1, padding: "0 8px 12px" }}>Caderno de Erros</div>
        {NOTEBOOK_AREAS.map(area => {
          const marks = countMarks(notebooks[area] || "");
          const hasContent = (notebooks[area] || "").replace(/<[^>]*>/g,"").trim().length > 0;
          return (
            <div
              key={area}
              onClick={() => setActiveArea(area)}
              style={{
                padding: "10px 12px", borderRadius: 10, cursor: "pointer",
                background: activeArea === area ? AREA_BG[area] : "transparent",
                border: activeArea === area ? `1.5px solid ${AREA_COLORS[area]}30` : "1.5px solid transparent",
                transition: "all .15s",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <span>{AREA_ICONS[area]}</span>
                  <span style={{ fontSize: 13, fontWeight: activeArea === area ? 700 : 500, color: activeArea === area ? AREA_COLORS[area] : "#555", lineHeight: 1.3 }}>{area}</span>
                </div>
              </div>
              <div style={{ display: "flex", gap: 6, marginTop: 6 }}>
                {hasContent && <span style={{ fontSize: 10, background: AREA_COLORS[area] + "20", color: AREA_COLORS[area], padding: "1px 6px", borderRadius: 10, fontWeight: 600 }}>✓ com conteúdo</span>}
                {marks > 0 && <span style={{ fontSize: 10, background: "#fef3c7", color: "#b45309", padding: "1px 6px", borderRadius: 10, fontWeight: 600 }}>🔖 {marks}</span>}
              </div>
            </div>
          );
        })}

        {/* Saved indicator */}
        <div style={{ marginTop: "auto", padding: "12px 8px 0", borderTop: "1px solid #f0f0f8" }}>
          <div style={{ fontSize: 11, color: saved ? "#10b981" : "#bbb", transition: "color .3s", display: "flex", alignItems: "center", gap: 4 }}>
            {saved ? "✓ Salvo" : "● Salvamento automático"}
          </div>
        </div>
      </div>

      {/* Editor area */}
      <div style={{ flex: 1, padding: "20px 28px", overflowY: "hidden", display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 24 }}>{AREA_ICONS[activeArea]}</span>
              <h2 style={{ fontSize: 20, fontWeight: 700, fontFamily: "'DM Serif Display', serif", color: AREA_COLORS[activeArea] }}>{activeArea}</h2>
            </div>
            <p style={{ fontSize: 12, color: "#aaa", marginTop: 2 }}>
              Use 🔖 para marcar trechos que quer revisar · Cole imagens diretamente no editor
            </p>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
            {countMarks(notebooks[activeArea] || "") > 0 && (
              <span style={{ fontSize: 12, background: "#fef3c7", color: "#b45309", padding: "6px 12px", borderRadius: 20, fontWeight: 600 }}>
                🔖 {countMarks(notebooks[activeArea] || "")} marcações para revisão
              </span>
            )}
            <button
              onClick={exportPDF}
              style={{ fontSize: 12, background: "#eef2ff", color: "#6366f1", border: "none", padding: "7px 14px", borderRadius: 20, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 5 }}
              title="Exportar este caderno como PDF"
            >
              📄 Exportar esta área
            </button>
            <button
              onClick={exportAllPDF}
              style={{ fontSize: 12, background: "#f0fdf4", color: "#16a34a", border: "none", padding: "7px 14px", borderRadius: 20, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 5 }}
              title="Exportar caderno completo (todas as áreas)"
            >
              📚 Exportar tudo
            </button>
          </div>
        </div>

        <NotebookEditor
          key={activeArea}
          area={activeArea}
          content={notebooks[activeArea] || ""}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

// ============================================================
// EXAMS PAGE
// ============================================================
function ExamsPage({ exams, setExams }) {
  const [showForm, setShowForm] = useState(false);
  const [filterType, setFilterType] = useState("Todas");
  const [selected, setSelected] = useState(null);
  const emptyForm = {
    type: "Prova Real",
    name: "",
    year: new Date().getFullYear().toString(),
    date: new Date().toISOString().slice(0,10),
    totalQ: "",
    correctQ: "",
    areas: {
      "Clínica Médica": { total: "", correct: "" },
      "Clínica Cirúrgica": { total: "", correct: "" },
      "Pediatria": { total: "", correct: "" },
      "Ginecologia e Obstetrícia": { total: "", correct: "" },
      "Preventiva & Social": { total: "", correct: "" },
    },
    notes: "",
  };
  const [form, setForm] = useState(emptyForm);

  const filtered = exams.filter(e => filterType === "Todas" || e.type === filterType)
    .sort((a,b) => new Date(a.date) - new Date(b.date));

  function saveExam() {
    if (!form.name || !form.totalQ || !form.correctQ) return;
    const accuracy = Math.round((parseInt(form.correctQ) / parseInt(form.totalQ)) * 100);
    const areaStats = {};
    Object.entries(form.areas).forEach(([area, v]) => {
      if (v.total && v.correct) {
        areaStats[area] = { total: parseInt(v.total), correct: parseInt(v.correct), accuracy: Math.round((parseInt(v.correct)/parseInt(v.total))*100) };
      }
    });
    const exam = { ...form, id: `exam-${Date.now()}`, accuracy, totalQ: parseInt(form.totalQ), correctQ: parseInt(form.correctQ), areaStats };
    setExams(prev => [...prev, exam]);
    setForm(emptyForm);
    setShowForm(false);
  }

  function deleteExam(id) {
    setExams(prev => prev.filter(e => e.id !== id));
    if (selected?.id === id) setSelected(null);
  }

  // Stats over time
  const realExams = exams.filter(e => e.type === "Prova Real").sort((a,b) => new Date(a.date)-new Date(b.date));
  const sims = exams.filter(e => e.type === "Simulado").sort((a,b) => new Date(a.date)-new Date(b.date));

  const areaEvolution = GRANDES_AREAS.map(area => {
    const pts = filtered.filter(e => e.areaStats?.[area]).map(e => ({ date: e.date, accuracy: e.areaStats[area].accuracy, name: e.name }));
    return { area, pts };
  });

  const bestExam = [...filtered].sort((a,b) => b.accuracy-a.accuracy)[0];
  const lastExam = [...filtered].sort((a,b) => new Date(b.date)-new Date(a.date))[0];
  const avgAcc = filtered.length ? Math.round(filtered.reduce((s,e)=>s+e.accuracy,0)/filtered.length) : 0;

  // Simple sparkline using divs
  function MiniChart({ data, color }) {
    if (!data || data.length < 2) return <div style={{fontSize:12,color:"#aaa"}}>Dados insuficientes</div>;
    const max = Math.max(...data.map(d=>d.accuracy));
    const min = Math.min(...data.map(d=>d.accuracy));
    const range = max - min || 1;
    return (
      <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 50 }}>
        {data.map((d,i) => {
          const h = Math.max(8, Math.round(((d.accuracy - min) / range) * 42) + 8);
          return (
            <div key={i} title={`${d.name || d.date}: ${d.accuracy}%`} style={{ flex: 1, height: h, background: color || "#6366f1", borderRadius: "3px 3px 0 0", opacity: 0.7 + (i/data.length)*0.3, cursor: "default", minWidth: 8 }} />
          );
        })}
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 24, fontFamily: "'DM Serif Display', serif" }}>🏆 Provas na Íntegra</h1>
          <p style={{ fontSize: 13, color: "#888", marginTop: 4 }}>Registre provas reais e simulados — acompanhe sua evolução</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm(true)}>+ Registrar prova</button>
      </div>

      {/* Filter */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {["Todas","Prova Real","Simulado"].map(t => (
          <button key={t} className="btn btn-sm" style={{ background: filterType === t ? "#6366f1" : "#f5f5fb", color: filterType === t ? "#fff" : "#555", border: "none", cursor: "pointer" }} onClick={() => setFilterType(t)}>
            {t === "Prova Real" ? "🏥 Prova Real" : t === "Simulado" ? "📝 Simulado" : "Todas"}
          </button>
        ))}
      </div>

      {exams.length === 0 ? (
        <div className="card" style={{ padding: 48, textAlign: "center", color: "#aaa" }}>
          <div style={{ fontSize: 52, marginBottom: 16 }}>🏆</div>
          <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>Nenhuma prova registrada ainda</div>
          <div style={{ fontSize: 13 }}>Registre sua primeira prova para começar a acompanhar sua evolução!</div>
        </div>
      ) : (
        <>
          {/* Summary cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 24 }}>
            {[
              { label: "Provas registradas", value: filtered.length, icon: "📋", color: "#6366f1" },
              { label: "Acerto médio", value: avgAcc ? `${avgAcc}%` : "—", icon: "🎯", color: avgAcc >= 70 ? "#10b981" : avgAcc >= 50 ? "#f59e0b" : "#dc2626" },
              { label: "Melhor resultado", value: bestExam ? `${bestExam.accuracy}%` : "—", icon: "🏅", color: "#10b981" },
              { label: "Última prova", value: lastExam ? formatDate(lastExam.date) : "—", icon: "📅", color: "#888" },
            ].map(s => (
              <div key={s.label} className="card" style={{ padding: 18 }}>
                <div style={{ fontSize: 22, marginBottom: 8 }}>{s.icon}</div>
                <div style={{ fontSize: 22, fontWeight: 700, color: s.color }}>{s.value}</div>
                <div style={{ fontSize: 12, color: "#888" }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Evolution charts */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 24 }}>
            <div className="card" style={{ padding: 20 }}>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>📈 Evolução geral — Provas Reais</div>
              <div style={{ fontSize: 12, color: "#888", marginBottom: 12 }}>Acerto % ao longo do tempo</div>
              <MiniChart data={realExams} color="#6366f1" />
              {realExams.length > 0 && (
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
                  <span style={{ fontSize: 11, color: "#aaa" }}>{formatDate(realExams[0]?.date)}</span>
                  <span style={{ fontSize: 11, color: "#aaa" }}>{formatDate(realExams[realExams.length-1]?.date)}</span>
                </div>
              )}
            </div>
            <div className="card" style={{ padding: 20 }}>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>📈 Evolução geral — Simulados</div>
              <div style={{ fontSize: 12, color: "#888", marginBottom: 12 }}>Acerto % ao longo do tempo</div>
              <MiniChart data={sims} color="#10b981" />
              {sims.length > 0 && (
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
                  <span style={{ fontSize: 11, color: "#aaa" }}>{formatDate(sims[0]?.date)}</span>
                  <span style={{ fontSize: 11, color: "#aaa" }}>{formatDate(sims[sims.length-1]?.date)}</span>
                </div>
              )}
            </div>
          </div>

          {/* Desempenho por área */}
          <div className="card" style={{ padding: 20, marginBottom: 24 }}>
            <div style={{ fontWeight: 700, marginBottom: 16 }}>🏥 Desempenho por Grande Área (todas as provas)</div>
            {areaEvolution.map(({ area, pts }) => {
              if (pts.length === 0) return null;
              const avg = Math.round(pts.reduce((s,p)=>s+p.accuracy,0)/pts.length);
              return (
                <div key={area} style={{ marginBottom: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, alignItems: "center" }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: AREA_COLORS[area] }}>{area}</span>
                    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                      <span style={{ fontSize: 12, color: "#888" }}>{pts.length} provas</span>
                      <span style={{ fontSize: 14, fontWeight: 700, color: avg >= 70 ? "#10b981" : avg >= 50 ? "#f59e0b" : "#dc2626" }}>{avg}%</span>
                    </div>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${avg}%`, background: AREA_COLORS[area] }} />
                  </div>
                  {/* Mini trend */}
                  {pts.length >= 2 && (
                    <div style={{ fontSize: 11, color: pts[pts.length-1].accuracy > pts[0].accuracy ? "#10b981" : "#dc2626", marginTop: 4 }}>
                      {pts[pts.length-1].accuracy > pts[0].accuracy ? "↑" : "↓"} {Math.abs(pts[pts.length-1].accuracy - pts[0].accuracy)}pp desde a primeira prova
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* List + detail */}
          <div style={{ display: "grid", gridTemplateColumns: selected ? "320px 1fr" : "1fr", gap: 20 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {filtered.map(e => (
                <div key={e.id} className="card" style={{ padding: 16, cursor: "pointer", border: selected?.id === e.id ? "2px solid #6366f1" : "1.5px solid #ebebf3" }} onClick={() => setSelected(e)}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 4 }}>
                        <span style={{ fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 20, background: e.type === "Prova Real" ? "#eef2ff" : "#ecfdf5", color: e.type === "Prova Real" ? "#6366f1" : "#10b981" }}>
                          {e.type === "Prova Real" ? "🏥 Real" : "📝 Simulado"}
                        </span>
                      </div>
                      <div style={{ fontSize: 14, fontWeight: 700 }}>{e.name} {e.year}</div>
                      <div style={{ fontSize: 12, color: "#888", marginTop: 2 }}>{formatDate(e.date)} · {e.totalQ} questões</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: 22, fontWeight: 800, color: e.accuracy >= 70 ? "#10b981" : e.accuracy >= 50 ? "#f59e0b" : "#dc2626" }}>{e.accuracy}%</div>
                      <div style={{ fontSize: 11, color: "#888" }}>{e.correctQ}/{e.totalQ}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {selected && (
              <div className="card" style={{ padding: 24 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                  <div>
                    <span style={{ fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 20, background: selected.type === "Prova Real" ? "#eef2ff" : "#ecfdf5", color: selected.type === "Prova Real" ? "#6366f1" : "#10b981" }}>
                      {selected.type}
                    </span>
                    <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 8 }}>{selected.name} {selected.year}</h2>
                    <p style={{ fontSize: 13, color: "#888" }}>{formatDate(selected.date)}</p>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button className="btn btn-sm" style={{ background: "#fef2f2", color: "#dc2626", border: "none" }} onClick={() => deleteExam(selected.id)}>Excluir</button>
                    <button className="btn btn-sm" style={{ background: "#f0f0f8", border: "none", cursor: "pointer" }} onClick={() => setSelected(null)}>✕</button>
                  </div>
                </div>

                {/* Overall */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 20 }}>
                  <div style={{ background: "#f8f8fb", borderRadius: 10, padding: 14, textAlign: "center" }}>
                    <div style={{ fontSize: 28, fontWeight: 800, color: selected.accuracy >= 70 ? "#10b981" : selected.accuracy >= 50 ? "#f59e0b" : "#dc2626" }}>{selected.accuracy}%</div>
                    <div style={{ fontSize: 12, color: "#888" }}>Acerto geral</div>
                  </div>
                  <div style={{ background: "#f8f8fb", borderRadius: 10, padding: 14, textAlign: "center" }}>
                    <div style={{ fontSize: 28, fontWeight: 800, color: "#6366f1" }}>{selected.correctQ}</div>
                    <div style={{ fontSize: 12, color: "#888" }}>Acertos</div>
                  </div>
                  <div style={{ background: "#f8f8fb", borderRadius: 10, padding: 14, textAlign: "center" }}>
                    <div style={{ fontSize: 28, fontWeight: 800, color: "#dc2626" }}>{selected.totalQ - selected.correctQ}</div>
                    <div style={{ fontSize: 12, color: "#888" }}>Erros</div>
                  </div>
                </div>

                {/* By area */}
                {Object.keys(selected.areaStats || {}).length > 0 && (
                  <div>
                    <div style={{ fontWeight: 700, marginBottom: 12 }}>Desempenho por área</div>
                    {Object.entries(selected.areaStats).map(([area, v]) => (
                      <div key={area} style={{ marginBottom: 12 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                          <span style={{ fontSize: 13, fontWeight: 600, color: AREA_COLORS[area] }}>{area}</span>
                          <span style={{ fontSize: 13, fontWeight: 700, color: v.accuracy >= 70 ? "#10b981" : v.accuracy >= 50 ? "#f59e0b" : "#dc2626" }}>{v.accuracy}% ({v.correct}/{v.total})</span>
                        </div>
                        <div className="progress-bar">
                          <div className="progress-fill" style={{ width: `${v.accuracy}%`, background: AREA_COLORS[area] }} />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {selected.notes && (
                  <div style={{ marginTop: 16, background: "#f8f8fb", borderRadius: 10, padding: 14 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: "#888", marginBottom: 6 }}>Anotações</div>
                    <div style={{ fontSize: 13 }}>{selected.notes}</div>
                  </div>
                )}
              </div>
            )}
          </div>
        </>
      )}

      {/* Add exam modal */}
      {showForm && (
        <div className="modal-bg" onClick={e => e.target === e.currentTarget && setShowForm(false)}>
          <div className="modal" style={{ maxWidth: 600 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20 }}>Registrar prova</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

              {/* Type */}
              <div style={{ display: "flex", gap: 8 }}>
                {["Prova Real", "Simulado"].map(t => (
                  <button key={t} className="btn btn-sm" style={{ flex: 1, background: form.type === t ? "#6366f1" : "#f5f5fb", color: form.type === t ? "#fff" : "#555", border: "none", cursor: "pointer", padding: 10 }} onClick={() => setForm(p => ({...p, type: t}))}>
                    {t === "Prova Real" ? "🏥 Prova Real" : "📝 Simulado"}
                  </button>
                ))}
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 12 }}>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>Nome da banca / simulado</label>
                  <input className="input" placeholder="Ex: USP, Revalida, Medcel..." value={form.name} onChange={e => setForm(p => ({...p, name: e.target.value}))} />
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>Ano</label>
                  <input className="input" type="number" value={form.year} onChange={e => setForm(p => ({...p, year: e.target.value}))} />
                </div>
              </div>

              <div>
                <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>Data que realizou</label>
                <input className="input" type="date" value={form.date} onChange={e => setForm(p => ({...p, date: e.target.value}))} />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>Total de questões</label>
                  <input className="input" type="number" placeholder="Ex: 120" value={form.totalQ} onChange={e => setForm(p => ({...p, totalQ: e.target.value}))} />
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>Questões corretas</label>
                  <input className="input" type="number" placeholder="Ex: 84" value={form.correctQ} onChange={e => setForm(p => ({...p, correctQ: e.target.value}))} />
                </div>
              </div>

              {/* Por área */}
              <div>
                <label style={{ fontSize: 13, fontWeight: 700, display: "block", marginBottom: 10 }}>Desempenho por área (opcional)</label>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {GRANDES_AREAS.map(area => (
                    <div key={area} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ fontSize: 12, fontWeight: 600, color: AREA_COLORS[area], width: 200, flexShrink: 0 }}>{area}</span>
                      <input className="input" type="number" placeholder="Total" style={{ width: 70 }} value={form.areas[area].total} onChange={e => setForm(p => ({...p, areas: {...p.areas, [area]: {...p.areas[area], total: e.target.value}}}))} />
                      <input className="input" type="number" placeholder="Certas" style={{ width: 70 }} value={form.areas[area].correct} onChange={e => setForm(p => ({...p, areas: {...p.areas, [area]: {...p.areas[area], correct: e.target.value}}}))} />
                      <span style={{ fontSize: 12, color: "#888", width: 40 }}>
                        {form.areas[area].total && form.areas[area].correct ? `${Math.round(parseInt(form.areas[area].correct)/parseInt(form.areas[area].total)*100)}%` : ""}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>Anotações (opcional)</label>
                <textarea className="input" placeholder="Como você se sentiu? O que precisa melhorar?" value={form.notes} onChange={e => setForm(p => ({...p, notes: e.target.value}))} style={{ minHeight: 80 }} />
              </div>

            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 22 }}>
              <button className="btn btn-primary" style={{ flex: 1 }} onClick={saveExam}>Salvar prova</button>
              <button className="btn btn-ghost" style={{ flex: 1 }} onClick={() => setShowForm(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
