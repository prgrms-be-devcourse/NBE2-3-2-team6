package com.redbox.domain.attach.dto;

import com.redbox.domain.attach.entity.AttachFile;
import lombok.Getter;

@Getter
public class AttachFileResponse {
    private final Long fileNo;
    private final String originFilename;
    private final String filename;

    public AttachFileResponse(AttachFile file) {
        this.fileNo = file.getId();
        this.originFilename = file.getOriginalFilename();
        this.filename = file.getNewFilename();
    }
}
