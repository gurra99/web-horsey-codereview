import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

@SuppressWarnings("unused")
@Repository
public interface RiderRepository extends JpaRepository<Rider, Long> {
    Page<Rider> findAllByUserLogin(String login, Pageable pageable);
}
