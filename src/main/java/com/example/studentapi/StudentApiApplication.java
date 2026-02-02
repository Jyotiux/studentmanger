package com.example.studentapi;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.example.studentapi.model.Student;
import com.example.studentapi.repository.StudentRepository;

@SpringBootApplication
public class StudentApiApplication {
    public static void main(String[] args) {
        SpringApplication.run(StudentApiApplication.class, args);
    }

    @Bean
    CommandLineRunner init(StudentRepository repo) {
        return args -> {
            if (repo.count() == 0) {
                repo.save(new Student("John", "Doe", "john@example.com"));
                repo.save(new Student("Jane", "Smith", "jane@example.com"));
            }
        };
    }
}
