package com.redbox.domain.redbox.applicaction;

import com.redbox.domain.redbox.dto.RedboxInfoResponse;
import com.redbox.domain.redbox.entity.Redbox;
import com.redbox.domain.redbox.repository.RedboxRepository;

import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class RedboxSerivce {

    private final RedboxRepository redboxRepository;

    public RedboxInfoResponse getRedboxInfo() {

        int totalCount = getRedboxTotalCount();
        // 수정하시면 됩니다 ^_^
        return new RedboxInfoResponse(totalCount);
    }

    private int getRedboxTotalCount() {
        Redbox redbox = redboxRepository.getReferenceById(1L);

        return redbox.getTotalCount();
    }
}