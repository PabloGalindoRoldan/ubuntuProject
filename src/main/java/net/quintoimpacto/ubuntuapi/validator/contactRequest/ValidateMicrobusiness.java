package net.quintoimpacto.ubuntuapi.validator.contactRequest;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import net.quintoimpacto.ubuntuapi.entity.MicroBusiness;
import net.quintoimpacto.ubuntuapi.exception.ValidateIntegrity;
import net.quintoimpacto.ubuntuapi.repository.IMicroBusinessRepository;

@Component
public class ValidateMicrobusiness {

    @Autowired
    private IMicroBusinessRepository microRepository;

    public void existMicrobusiness(Long id){
        Optional<MicroBusiness>  micro = microRepository.findByIdAndDeletedFalse(id);
        if(!micro.isPresent()){
            throw new ValidateIntegrity("Not exist microbusiness");
        }
    }
}
