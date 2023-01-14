import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface StableService {

    Stable save(Stable stable);

    Stable update(Stable stable);

    Optional<Stable> partialUpdate(Stable stable);

    Page<Stable> findAll(Pageable pageable);

    Optional<Stable> findOne(Long id);

    void delete(Long id);
}
