package net.quintoimpacto.ubuntuapi.controller;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import net.quintoimpacto.ubuntuapi.dto.CategoryDTO;
import net.quintoimpacto.ubuntuapi.dto.microbusinessDTO.MicroBusinessDTO;
import net.quintoimpacto.ubuntuapi.dto.microbusinessDTO.MicroBusinessRegisterDTO;
import net.quintoimpacto.ubuntuapi.dto.microbusinessDTO.MicroBusinessShowDto;
import net.quintoimpacto.ubuntuapi.dto.microbusinessDTO.MicroBusinessUpdateDTO;
import net.quintoimpacto.ubuntuapi.entity.enums.Category;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import net.quintoimpacto.ubuntuapi.service.IMicroBusinessService;
import net.quintoimpacto.ubuntuapi.service.IUserService;

@RestController
@RequestMapping("/microbusiness")
public class MicroBusinessController {

    @Autowired
    private IMicroBusinessService microBusinessService;

    @Autowired
    private IUserService userService;

    @PostMapping("/")
    public ResponseEntity<MicroBusinessShowDto> save(@RequestBody MicroBusinessRegisterDTO microBusinessDTO) {
        MicroBusinessShowDto microBusiness = microBusinessService.save(microBusinessDTO);
        return new ResponseEntity<>(microBusiness, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<MicroBusinessDTO> getById(@PathVariable Long id) {
        Optional<MicroBusinessDTO> microBusinessDTO = microBusinessService.findById(id);
        return microBusinessDTO.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@RequestBody MicroBusinessUpdateDTO microBusinessDTO, @PathVariable Long id){
        //String email = getUserPrincipal();
        Optional<MicroBusinessDTO> microBusinessOptional = microBusinessService.findById(id);
        
        if(microBusinessOptional.isPresent()){
            microBusinessService.update(microBusinessDTO, id);
            return ResponseEntity.ok("Registro actualizado");
        }else{
            return ResponseEntity.notFound().build();
        } 

    }

    @GetMapping("/findAll")
    public ResponseEntity<List<MicroBusinessDTO>> findAllMicro() {
        var listMicroBusiness = microBusinessService.findAll();
        return  ResponseEntity.status(HttpStatus.OK).body(listMicroBusiness);
    }

   
    @GetMapping("/")
    public ResponseEntity<?> searhByName(@RequestParam("search") String name) {
        var setMicroBusinessDTO = microBusinessService.findByName(name);
        return new ResponseEntity<>(setMicroBusinessDTO, HttpStatus.valueOf(200));
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<MicroBusinessDTO>> searchCategory(@PathVariable Category category){
        return ResponseEntity.status(HttpStatus.OK).body(microBusinessService.findByCategory(category));
    }

    @GetMapping("/categories")
    private ResponseEntity<List<CategoryDTO>> searchAllCategory(){
        return ResponseEntity.status(HttpStatus.OK).body(microBusinessService.getAllCategory());
    }
    
    @GetMapping("/findAllUser")
    public ResponseEntity<Set<MicroBusinessDTO>> findAllMicroByUser() {
        String email = getUserPrincipal();
        var listMicroBusiness = microBusinessService.findByUserEmailMicroBusiness(email);
        return  ResponseEntity.status(HttpStatus.OK).body(listMicroBusiness);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteMicros(@PathVariable Long id) {
        //String email = getUserPrincipal();

        Optional<MicroBusinessDTO> microBusinessOptional = microBusinessService.findById(id);
        
        if(microBusinessOptional.isPresent()){
            microBusinessService.delete(id);
            return ResponseEntity.ok("Registro eliminado");
        }else{
            return ResponseEntity.notFound().build();
        } 
    }

    /* @GetMapping("/microNewWeekly")
    public ResponseEntity<?> getMicroNew() {
        //String email = getUserPrincipal();
        var listMicro = microBusinessService.getNewMicroBusinessesForTheWeek();
        return  ResponseEntity.status(HttpStatus.OK).body(listMicro);
    } */
   
    private String getUserPrincipal(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getPrincipal().toString();
    }
}