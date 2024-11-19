package pe.edu.vallegrande.database.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Builder
@AllArgsConstructor
@Data
@Table("family")
public class Family {
    @Id
    private Long id;
    
    private String direction;
    
    @Column("reasib_admission")
    private String reasibAdmission;
    
    @Column("family_composition_id")
    private Long familyCompositionId;
    
    @Column("community_environment_id")
    private Long communityEnvironmentId;
    
    @Column("housing_environment_id")
    private Long housingEnvironmentId;
    
    @Column("basic_service_service_id")
    private Long basicServiceId;
    
    @Column("labor_autonomy_id")
    private Long laborAutonomyId;
    
    @Column("housing_distribution_id")
    private Long housingDistributionId;
    
    @Column("family_feeding_id")
    private Long familyFeedingId;
    
    @Column("family_health_id")
    private Long familyHealthId;
    
    @Column("social_life_id")
    private Long socialLifeId;
}
