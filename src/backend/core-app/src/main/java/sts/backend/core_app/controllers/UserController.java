package sts.backend.core_app.controllers;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import sts.backend.core_app.dto.user.UserCreationInfo;
import sts.backend.core_app.dto.user.UserSignUp;
import sts.backend.core_app.exceptions.ResourceNotFoundException;
import sts.backend.core_app.services.business.UserService;

@RestController
@RequestMapping("/api/v1")
public class UserController {
    
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/users")
    public UserCreationInfo api_create_player(@RequestBody UserSignUp userSignUp) throws ResourceNotFoundException {
        return userService.createUser(userSignUp);
    }

}
