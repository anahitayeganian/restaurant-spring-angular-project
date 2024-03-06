package com.ay.restaurant.utils;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EmailUtils {

    private final JavaMailSender emailSender;

    @Value("${spring.mail.username}")
    private String from;

    public void sendSimpleMessage(String to, String subject, String text, List<String> list) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(from);
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);
        if(list!=null && !list.isEmpty())
            message.setCc(getCcArray(list));
        emailSender.send(message);
    }

    private String[] getCcArray(List<String> ccList) {
        String[] cc = new String[ccList.size()];
        for(int i=0; i<ccList.size(); i++)
            cc[i] = ccList.get(i);
        return cc;
    }

}
