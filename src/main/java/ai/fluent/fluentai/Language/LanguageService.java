package ai.fluent.fluentai.Language;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LanguageService {

    @Autowired
    private LanguageRepository languageRepository;

    public List<Language> getAllLanguages() {
        return languageRepository.findAll();
    }

    public Optional<Language> getLanguageById(int _id) {
        return languageRepository.findById(_id);
    }

    public Language addLanguage(Language _language) {
        return languageRepository.save(_language);
    }

    public boolean deleteLanguage(int _id) {
        return languageRepository.findById(_id).map(language -> {
            languageRepository.delete(language);
            return true;
        }).orElse(false);
    }

    public Optional<Language> updateLanguage(int _id, Language _language) {
        return languageRepository.findById(_id).map(existingLanguage -> {
            existingLanguage.setName(_language.getName());
            return languageRepository.save(existingLanguage);
        });
    }
}
