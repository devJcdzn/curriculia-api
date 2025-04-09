import fs from "node:fs";
import { join } from "node:path";

const modelPath = join(__dirname, "../lib/model.txt");
const rawLatexModel = fs.readFileSync(modelPath, "utf-8");

export const generateLatexResumeByJson = (profileData: {
	fullName: string;
	title: string;
	location?: string;
	contact: {
		email: string;
		phone?: string;
		linkedin?: string;
		github?: string;
		portfolio?: string;
	};
	about: string;
	experiences?: Array<{
		position: string;
		company: string;
		startDate: string;
		endDate?: string;
		responsibilities?: string[];
		achievements?: string[];
	}>;
	education?: Array<{
		degree: string;
		institution: string;
		yearOfCompletion: string;
		description?: string;
	}>;
	skills?: string[];
	projects?: Array<{
		name: string;
		description?: string;
		technologies?: string[];
		link?: string;
	}>;
	certifications?: Array<{
		name: string;
		issuer: string;
		year: string;
		description?: string;
	}>;
	languages?: Array<{
		language: string;
		level: string;
	}>;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	[extraSection: string]: any;
	selectedTemplate: string;
}) => {
	return `### **📝 Geração de Currículo em LaTeX**  

Aqui estão os dados do usuário em JSON formatado:  

\`\`\`json
${JSON.stringify(profileData, null, 2)}
\`\`\`

Com base **exclusivamente** nessas informações, gere um currículo profissional em **LaTeX**, otimizado para candidaturas em **Big Techs (FAANG e similares)**, seguindo o modelo fornecido.

### **📌 Estrutura do Currículo:**  
- **Nome Completo:** ${profileData.fullName}  
- **Cargo / Título Profissional:** ${profileData.title}  
${profileData.location ? `- **Localização:** ${profileData.location}` : ""}  

#### **📧 Contato:**  
- **Email:** ${profileData.contact.email}  
${profileData.contact.phone ? `- **Telefone:** ${profileData.contact.phone}` : ""}
${profileData.contact.linkedin ? `- **LinkedIn:** ${profileData.contact.linkedin}` : ""}
${profileData.contact.github ? `- **GitHub:** ${profileData.contact.github}` : ""}
${profileData.contact.portfolio ? `- **Portfólio:** ${profileData.contact.portfolio}` : ""}

#### **📖 Resumo Profissional:**  
A partir da seção **"about"**, gere um **parágrafo conciso** destacando:  
- Principais experiências e habilidades  
- Tecnologias mais utilizadas  
- Diferenciais competitivos  

${
	profileData.experiences && profileData.experiences.length > 0
		? `#### **💼 Experiência Profissional:**  
Para cada entrada no array \`experiences\`, crie uma seção contendo:  
- **Cargo** na **Empresa** (**MM/YYYY - MM/YYYY** ou "Atual" se não houver \`endDate\`)  
- Lista de responsabilidades e conquistas usando **\`\\itemize{}\`**, destacando métricas e impactos relevantes  
`
		: ""
}

${
	profileData.education && profileData.education.length > 0
		? `#### **🎓 Formação Acadêmica:**  
Para cada entrada no array \`education\`, inclua:  
- Nome do curso, instituição e ano de conclusão  
- Se não houver \`description\`, gere uma descrição **curta e profissional** sobre a relevância do curso para a área do candidato.  
`
		: ""
}

${
	profileData.skills && profileData.skills.length > 0
		? `#### **🛠️ Habilidades Técnicas:**  
Liste as tecnologias e ferramentas mencionadas em \`skills\`, usando **\`\\textbf{}\`** para destacar as mais importantes.  
`
		: ""
}

${
	profileData.projects && profileData.projects.length > 0
		? `#### **🚀 Projetos Relevantes:**  
Se houver entradas em \`projects\`, crie uma seção com:  
- Nome do projeto, breve descrição e tecnologias utilizadas  
- Se não houver \`description\`, gere uma **descrição criativa e profissional**, explicando o propósito do projeto e seus impactos.  
- Link do projeto, se disponível  
`
		: ""
}

${
	profileData.certifications && profileData.certifications.length > 0
		? `#### **📜 Certificações:**  
Caso existam certificações em \`certifications\`, formate como uma lista contendo nome, emissor e ano.  
- Se não houver \`description\`, gere um **resumo objetivo** sobre a importância dessa certificação na área do candidato.  
`
		: ""
}

${
	profileData.languages && profileData.languages.length > 0
		? `#### **🌍 Idiomas:**  
Se houver entradas em \`languages\`, exiba a língua e nível de proficiência.  
`
		: ""
}

### **📌 Seções Extras:**  
Caso existam seções adicionais não previstas, identifique-as e adicione-as ao currículo.  

---

Agora, converta essas informações em um currículo **LaTeX**, seguindo o modelo abaixo:  

\`\`\`\latex
"""${rawLatexModel}"""
\`\`\`

**Retorne apenas o código LaTeX gerado**, pronto para ser compilado.`;
};
