import { UserRepository } from '../../../domain/repositories/user.repository';
import { PassCompetences } from '../../../domain/entities/pass-competences';

export class GetPassCompetencesUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  execute(): Promise<PassCompetences> {
    return this.userRepository.getPassCompetences();
  }
}
