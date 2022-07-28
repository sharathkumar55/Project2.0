package com.example.StudentProject.service;

import com.example.StudentProject.entity.Student;

import java.util.List;

public interface StudentService {

    public Student saveStudent(Student student);

    public List<Student> getAllStudents();
}
