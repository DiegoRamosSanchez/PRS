package pe.edu.vallegrande.database.service;

import org.springframework.stereotype.Service;
import pe.edu.vallegrande.database.dto.FamilyDTO;
import pe.edu.vallegrande.database.model.*;
import pe.edu.vallegrande.database.repository.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class FamilyService {

    private final BasicServiceRepository basicServiceRepository;
    private final CommunityEnvironmentRepository communityEnvironmentRepository;
    private final FamilyCompositionRepository familyCompositionRepository;
    private final FamilyFeedingRepository familyFeedingRepository;
    private final FamilyHealthRepository familyHealthRepository;
    private final HousingDistributionRepository housingDistributionRepository;
    private final HousingEnvironmentRepository housingEnvironmentRepository;
    private final LaborAutonomyRepository laborAutonomyRepository;
    private final SocialLifeRepository socialLifeRepository;
    private final FamilyRepository familyRepository; // Añade el repositorio de Family

    public FamilyService(BasicServiceRepository basicServiceRepository,
                         CommunityEnvironmentRepository communityEnvironmentRepository,
                         FamilyCompositionRepository familyCompositionRepository,
                         FamilyFeedingRepository familyFeedingRepository,
                         FamilyHealthRepository familyHealthRepository,
                         HousingDistributionRepository housingDistributionRepository,
                         HousingEnvironmentRepository housingEnvironmentRepository,
                         LaborAutonomyRepository laborAutonomyRepository,
                         SocialLifeRepository socialLifeRepository,
                         FamilyRepository familyRepository) { // Añade el repositorio al constructor
        this.basicServiceRepository = basicServiceRepository;
        this.communityEnvironmentRepository = communityEnvironmentRepository;
        this.familyCompositionRepository = familyCompositionRepository;
        this.familyFeedingRepository = familyFeedingRepository;
        this.familyHealthRepository = familyHealthRepository;
        this.housingDistributionRepository = housingDistributionRepository;
        this.housingEnvironmentRepository = housingEnvironmentRepository;
        this.laborAutonomyRepository = laborAutonomyRepository;
        this.socialLifeRepository = socialLifeRepository;
        this.familyRepository = familyRepository; // Inicializa el repositorio
    }

    public Mono<FamilyDTO> populateRelatedEntities(Family family) {
        FamilyDTO dto = new FamilyDTO();
        dto.setId(family.getId());
        dto.setDirection(family.getDirection());
        dto.setReasibAdmission(family.getReasibAdmission());
    
        return basicServiceRepository.findById(family.getBasicServiceServiceId())
            .flatMap(basicService -> {
                dto.setBasicService(basicService); // Asigna la entidad completa
                return communityEnvironmentRepository.findById(family.getCommunityEnvironmentId());
            })
            .flatMap(communityEnvironment -> {
                dto.setCommunityEnvironment(communityEnvironment); // Asigna la entidad completa
                return familyCompositionRepository.findById(family.getFamilyCompositionId());
            })
            .flatMap(familyComposition -> {
                dto.setFamilyComposition(familyComposition); // Asigna la entidad completa
                return familyFeedingRepository.findById(family.getFamilyFeedingId());
            })
            .flatMap(familyFeeding -> {
                dto.setFamilyFeeding(familyFeeding); // Asigna la entidad completa
                return familyHealthRepository.findById(family.getFamilyHealthId());
            })
            .flatMap(familyHealth -> {
                dto.setFamilyHealth(familyHealth); // Asigna la entidad completa
                return housingDistributionRepository.findById(family.getHousingDistributionId());
            })
            .flatMap(housingDistribution -> {
                dto.setHousingDistribution(housingDistribution); // Asigna la entidad completa
                return housingEnvironmentRepository.findById(family.getHousingEnvironmentId());
            })
            .flatMap(housingEnvironment -> {
                dto.setHousingEnvironment(housingEnvironment); // Asigna la entidad completa
                return laborAutonomyRepository.findById(family.getLaborAutonomyId());
            })
            .flatMap(laborAutonomy -> {
                dto.setLaborAutonomy(laborAutonomy); // Asigna la entidad completa
                return socialLifeRepository.findById(family.getSocialLifeId());
            })
            .map(socialLife -> {
                dto.setSocialLife(socialLife); // Asigna la entidad completa
                return dto; // Retorna el DTO completo
            });
    }
    
    // Método para obtener un listado general de FamilyDTO
    public Flux<FamilyDTO> findAll() {
        return familyRepository.findAll()
            .flatMap(this::populateRelatedEntities);
    }

    public Mono<FamilyDTO> findById(Integer id) {
        return familyRepository.findById(id)
            .flatMap(this::populateRelatedEntities);
    }

    public Mono<FamilyDTO> createFamily(FamilyDTO familyDTO) {
        // Save related entities sequentially
        return basicServiceRepository.save(familyDTO.getBasicService())
            .flatMap(savedBasicService -> {
                familyDTO.getBasicService().setServiceId(savedBasicService.getServiceId());
                return communityEnvironmentRepository.save(familyDTO.getCommunityEnvironment());
            })
            .flatMap(savedCommunityEnvironment -> {
                familyDTO.getCommunityEnvironment().setId(savedCommunityEnvironment.getId());
                return familyCompositionRepository.save(familyDTO.getFamilyComposition());
            })
            .flatMap(savedFamilyComposition -> {
                familyDTO.getFamilyComposition().setId(savedFamilyComposition.getId());
                return familyFeedingRepository.save(familyDTO.getFamilyFeeding());
            })
            .flatMap(savedFamilyFeeding -> {
                familyDTO.getFamilyFeeding().setId(savedFamilyFeeding.getId());
                return familyHealthRepository.save(familyDTO.getFamilyHealth());
            })
            .flatMap(savedFamilyHealth -> {
                familyDTO.getFamilyHealth().setId(savedFamilyHealth.getId());
                return housingDistributionRepository.save(familyDTO.getHousingDistribution());
            })
            .flatMap(savedHousingDistribution -> {
                familyDTO.getHousingDistribution().setId(savedHousingDistribution.getId());
                return housingEnvironmentRepository.save(familyDTO.getHousingEnvironment());
            })
            .flatMap(savedHousingEnvironment -> {
                familyDTO.getHousingEnvironment().setId(savedHousingEnvironment.getId());
                return laborAutonomyRepository.save(familyDTO.getLaborAutonomy());
            })
            .flatMap(savedLaborAutonomy -> {
                familyDTO.getLaborAutonomy().setId(savedLaborAutonomy.getId());
                return socialLifeRepository.save(familyDTO.getSocialLife());
            })
            .flatMap(savedSocialLife -> {
                familyDTO.getSocialLife().setId(savedSocialLife.getId());
                
                // Create Family entity with saved IDs
                Family family = new Family();
                family.setDirection(familyDTO.getDirection());
                family.setReasibAdmission(familyDTO.getReasibAdmission());
                family.setBasicServiceServiceId(familyDTO.getBasicService().getServiceId());
                family.setCommunityEnvironmentId(familyDTO.getCommunityEnvironment().getId());
                family.setFamilyCompositionId(familyDTO.getFamilyComposition().getId());
                family.setFamilyFeedingId(familyDTO.getFamilyFeeding().getId());
                family.setFamilyHealthId(familyDTO.getFamilyHealth().getId());
                family.setHousingDistributionId(familyDTO.getHousingDistribution().getId());
                family.setHousingEnvironmentId(familyDTO.getHousingEnvironment().getId());
                family.setLaborAutonomyId(familyDTO.getLaborAutonomy().getId());
                family.setSocialLifeId(familyDTO.getSocialLife().getId());
    
                return familyRepository.save(family);
            })
            .flatMap(this::populateRelatedEntities)
            .onErrorResume(e -> {
                e.printStackTrace(); // Log full stack trace
                return Mono.error(new RuntimeException("Error during family creation: " + e.getMessage()));
            });
    }

    
    public Mono<FamilyDTO> updateFamily(Integer id, Family family) {
        return familyRepository.findById(id)
            .flatMap(existingFamily -> {
                existingFamily.setDirection(family.getDirection());
                existingFamily.setReasibAdmission(family.getReasibAdmission());
                // Actualiza otros campos según sea necesario
                return familyRepository.save(existingFamily);
            })
            .flatMap(this::populateRelatedEntities);
    }

    public Mono<Void> deleteFamily(Integer id) {
        return familyRepository.deleteById(id);
    }
}
