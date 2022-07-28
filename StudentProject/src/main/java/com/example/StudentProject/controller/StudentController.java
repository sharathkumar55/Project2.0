package com.example.StudentProject.controller;

import com.example.StudentProject.entity.Student;
import com.example.StudentProject.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class StudentController {

    @Autowired
    public StudentService studentService;

    @PostMapping("/students")
    public String addStudents(@RequestBody Student student)
    {
        studentService.saveStudent(student);
        return "new student is added";
    }
    @GetMapping("/students")
    public List<Student> getAllStudents(){
        return studentService.getAllStudents();
    }
}
