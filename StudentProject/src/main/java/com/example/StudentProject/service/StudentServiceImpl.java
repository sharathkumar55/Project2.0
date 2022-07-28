package com.example.StudentProject.service;

import com.example.StudentProject.entity.Student;
import com.example.StudentProject.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentServiceImpl implements StudentService {

    @Autowired
    public StudentRepository studentRepository;
    @Override
    public Student saveStudent(Student student) {
       return  studentRepository.save(student);
    }

    @Override
    public List<Student> getAllStudents() {
       return studentRepository.findAll();
    }
}
