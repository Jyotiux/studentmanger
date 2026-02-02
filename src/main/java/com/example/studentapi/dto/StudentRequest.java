package com.example.studentapi.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class StudentRequest {

    @NotBlank(message = "firstName must not be blank")
    @Size(max = 100, message = "firstName must be at most 100 characters")
    private String firstName;

    @NotBlank(message = "lastName must not be blank")
    @Size(max = 100, message = "lastName must be at most 100 characters")
    private String lastName;

    @NotBlank(message = "email must not be blank")
    @Email(message = "email must be a valid email address")
    @Size(max = 200, message = "email must be at most 200 characters")
    private String email;

    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }

    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
}
