package ai.fluent.fluentai.Language;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(exposedHeaders = "content-range")
@RequestMapping("/v1/languages")
public class LanguageController {

    @Autowired
    private LanguageService languageService;

    @GetMapping
    public List<Language> getAllLanguages() {
        return languageService.getAllLanguages();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Language> getLanguageById(@PathVariable int id) {
        return languageService.getLanguageById(id)
                .map(language -> ResponseEntity.ok(language))
                .orElse(ResponseEntity.status(404).build());
    }

    @PostMapping
    public Language addLanguage(@RequestBody Language _language) {
        return languageService.addLanguage(_language);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLanguage(@PathVariable int id) {
        if (languageService.deleteLanguage(id)) {
            return ResponseEntity.status(204).build();
        } else {
            return ResponseEntity.status(404).build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Language> updateLanguage(@PathVariable int id, @RequestBody Language _language) {
        return languageService.updateLanguage(id, _language)
                .map(_updatedLanguage -> ResponseEntity.ok(_updatedLanguage))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

}
