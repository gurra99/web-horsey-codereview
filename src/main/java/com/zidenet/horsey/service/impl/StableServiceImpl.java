import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class StableServiceImpl implements StableService {

    private final Logger log = LoggerFactory.getLogger(StableServiceImpl.class);

    private final StableRepository stableRepository;

    public StableServiceImpl(StableRepository stableRepository) {
        this.stableRepository = stableRepository;
    }

    @Override
    public Stable save(Stable stable) {
        return stableRepository.save(stable);
    }

    @Override
    public Stable update(Stable stable) {
        return stableRepository.save(stable);
    }

    @Override
    public Optional<Stable> partialUpdate(Stable stable) {

        return stableRepository
            .findById(stable.getId())
            .map(existingStable -> {
                if (stable.getPhoto() != null) {
                    existingStable.setPhoto(stable.getPhoto());
                }
                if (stable.getName() != null) {
                    existingStable.setName(stable.getName());
                }
                if (stable.getDescription() != null) {
                    existingStable.setDescription(stable.getDescription());
                }
                if (stable.getBuildYear() != null) {
                    existingStable.setBuildYear(stable.getBuildYear());
                }
                if (stable.getRidingEquipment() != null) {
                    existingStable.setRidingEquipment(stable.getRidingEquipment());
                }
                if (stable.getShowInPublic() != null) {
                    existingStable.setShowInPublic(stable.getShowInPublic());
                }

                return existingStable;
            })
            .map(stableRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Stable> findAll(Pageable pageable) {
        if (SecurityUtils.hasCurrentUserThisAuthority(AuthoritiesConstants.ADMIN)) {
            return stableRepository.findAll(pageable);
        } else {
            return stableRepository.findAllByCourtyardHorseOwnerUserLogin(SecurityUtils.getCurrentUserLogin().get(), pageable);
        }
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Stable> findOne(Long id) {
        return stableRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        stableRepository.deleteById(id);
    }
}
