package ai.fluent.fluentai.Language;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

@Service
public class LanguageService {

    @Autowired
    private LanguageRepository languageRepository;

    public List<Language> getAllLanguages() {
        return languageRepository.findAll();
    }

    public List<Language> getAllLanguages(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return languageRepository.findAll(pageable).getContent();
    }

    public int getTotalLanguages() {
        return (int) languageRepository.count();
    }

    public Optional<Language> getLanguageById(int id) {
        return languageRepository.findById(id);
    }

    public Language addLanguage(Language _language) {
        return languageRepository.save(_language);
    }

    public boolean deleteLanguage(int id) {
        return languageRepository.findById(id).map(language -> {
            languageRepository.delete(language);
            return true;
        }).orElse(false);
    }

    public Optional<Language> updateLanguage(int id, Language _language) {
        return languageRepository.findById(id).map(existingLanguage -> {
            existingLanguage.setName(_language.getName());
            return languageRepository.save(existingLanguage);
        });
    }
}
