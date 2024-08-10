package ai.fluent.fluentai.Persona;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(exposedHeaders = "content-range")
@RequestMapping("/v1/personas")
public class PersonaController {

    @Autowired
    private PersonaService personaService;

    @GetMapping
    public ResponseEntity<List<Persona>> getAllPersonas(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        List<Persona> personas = personaService.getAllPersonas(page, size);
        int totalPersonas = personaService.getTotalPersonas();

        int start = page * size;
        int end = Math.min((page + 1) * size - 1, totalPersonas - 1);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Range", "personas " + start + "-" + end + "/" + totalPersonas);

        return new ResponseEntity<>(personas, headers, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Persona> getPersonaById(@PathVariable Integer id) {
        Optional<Persona> persona = personaService.getPersonaById(id);
        return persona.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Persona createPersona(@RequestBody Persona persona) {
        return personaService.createPersona(persona);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Persona> updatePersona(@PathVariable Integer id, @RequestBody Persona personaDetails) {
        Optional<Persona> updatedPersona = personaService.updatePersona(id, personaDetails);
        return updatedPersona.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePersona(@PathVariable Integer id) {
        personaService.deletePersona(id);
        return ResponseEntity.ok().build();
    }
}
