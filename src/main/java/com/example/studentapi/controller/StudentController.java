package com.example.studentapi.controller;

import com.example.studentapi.dto.StudentRequest;
import com.example.studentapi.model.Student;
import com.example.studentapi.service.StudentService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/students")
@CrossOrigin(origins = "*")
public class StudentController {
    private final StudentService service;

    public StudentController(StudentService service) { this.service = service; }

    @GetMapping
    public List<Student> getAll() { return service.findAll(); }

    @PostMapping
    public ResponseEntity<Student> create(@Valid @RequestBody StudentRequest req) {
        Student toSave = new Student(req.getFirstName(), req.getLastName(), req.getEmail());
        Student saved = service.save(toSave);
        return ResponseEntity.created(URI.create("/students/" + saved.getId())).body(saved);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
