import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;


@RestController
@RequestMapping("/api")
public class StableResource {

    private final Logger log = LoggerFactory.getLogger(StableResource.class);

    private static final String ENTITY_NAME = "stable";

    private String applicationName;

    private final StableService stableService;

    private final StableRepository stableRepository;

    public StableResource(StableService stableService, StableRepository stableRepository) {
        this.stableService = stableService;
        this.stableRepository = stableRepository;
    }

    @PostMapping("/stables")
    public ResponseEntity<Stable> createStable(@Valid @RequestBody Stable stable) throws URISyntaxException {
        if (stable.getId() != null) {
            throw new BadRequestAlertException("A new stable cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Stable result = stableService.save(stable);
        return ResponseEntity
            .created(new URI("/api/stables/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    @PutMapping("/stables/{id}")
    public ResponseEntity<Stable> updateStable(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody Stable stable
    ) throws URISyntaxException {
        if (stable.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, stable.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!stableRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Stable result = stableService.update(stable);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, stable.getId().toString()))
            .body(result);
    }

    @PatchMapping(value = "/stables/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Stable> partialUpdateStable(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Stable stable
    ) throws URISyntaxException {
        if (stable.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, stable.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!stableRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Stable> result = stableService.partialUpdate(stable);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, stable.getId().toString())
        );
    }

    @GetMapping("/stables")
    public ResponseEntity<List<Stable>> getAllStables(@org.springdoc.api.annotations.ParameterObject Pageable pageable) {
        Page<Stable> page = stableService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    @GetMapping("/stables/{id}")
    public ResponseEntity<Stable> getStable(@PathVariable Long id) {
        Optional<Stable> stable = stableService.findOne(id);
        return ResponseUtil.wrapOrNotFound(stable);
    }

    @DeleteMapping("/stables/{id}")
    public ResponseEntity<Void> deleteStable(@PathVariable Long id) {
        stableService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
