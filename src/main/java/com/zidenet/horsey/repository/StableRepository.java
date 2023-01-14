import com.zidenet.horsey.domain.Stable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

@Repository
public interface StableRepository extends JpaRepository<Stable, Long> {
    Page<Stable> findAllByCourtyardHorseOwnerUserLogin(String login, Pageable pageable);
}
