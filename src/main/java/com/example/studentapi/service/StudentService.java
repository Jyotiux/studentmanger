package com.example.studentapi.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.studentapi.model.Student;
import com.example.studentapi.repository.StudentRepository;

@Service
public class StudentService {
    private final StudentRepository repo;

    public StudentService(StudentRepository repo) { this.repo = repo; }

    public List<Student> findAll() { return repo.findAll(); }

    public Student save(Student s) { return repo.save(s); }

    public void deleteById(Long id) { repo.deleteById(id); }
}
