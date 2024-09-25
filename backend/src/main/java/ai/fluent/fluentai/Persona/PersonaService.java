package ai.fluent.fluentai.Persona;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

@Service
public class PersonaService {

    @Autowired
    private PersonaRepository personaRepository;

    public List<Persona> getAllPersonas() {
        return personaRepository.findAll();
    }

    public List<Persona> getAllPersonas(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return personaRepository.findAll(pageable).getContent();
    }

    public int getTotalPersonas() {
        return (int) personaRepository.count();
    }

    public Optional<Persona> getPersonaById(Integer id) {
        return personaRepository.findById(id);
    }

    public Persona createPersona(Persona persona) {
        return personaRepository.save(persona);
    }

    public Optional<Persona> updatePersona(Integer id, Persona personaDetails) {
        return personaRepository.findById(id).map(persona -> {
            persona.setName(personaDetails.getName());
            persona.setContext(personaDetails.getContext());
            return personaRepository.save(persona);
        });
    }

    public void deletePersona(Integer id) {
        personaRepository.deleteById(id);
    }
}
