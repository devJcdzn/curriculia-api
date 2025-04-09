import { type IResume, Resume } from "../../models/resume";

export class ResumeRepository {
	// Criar ou atualizar um currículo
	async createOrUpdateResume(data: IResume): Promise<IResume> {
		try {
			const resume = await Resume.findOneAndUpdate({ key: data.key }, data, {
				new: true,
				upsert: true,
			});
			return resume;
		} catch (error) {
			throw new Error(`Erro ao salvar currículo: ${error}`);
		}
	}

	// Buscar currículo por chave
	async findByKey(key: string): Promise<IResume | null> {
		try {
			return await Resume.findOne({ key });
		} catch (error) {
			throw new Error(`Erro ao buscar currículo: ${error}`);
		}
	}
}
