package com.redbox.domain.request.service;

import com.redbox.domain.request.dto.BoardDetailResponse;
import com.redbox.domain.request.entity.Board;
import com.redbox.domain.request.repository.BoardDetailRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BoardDetailService {

    private final BoardDetailRepository boardDetailRepository;

    public BoardDetailResponse getBoardDetail(Long boardId) {
        Board board = boardDetailRepository.findById(boardId).get();

        // 조회수 저장
        /// 2개씩 늘어나는 문제
        board.setRequest_hits(board.getRequest_hits() + 1);
        boardDetailRepository.save(board);
        System.out.println("조회수 : " + board.getRequest_hits());

        // 첨부 파일
        List<BoardDetailResponse.AttachmentResponse> attachments = new ArrayList<>();
        if(board.getRequest_attach_file() != null) {

            // 파일 이름 전체 추출
            int fileNameIndex = board.getRequest_attach_file().lastIndexOf("\\") + 1;
            String fullFileName = board.getRequest_attach_file().substring(fileNameIndex);
            System.out.println(fullFileName);

            // 파일 이름에서 첫 번째 '_' 뒤의 문자열 추출
            int underscoreIndex = fullFileName.indexOf("_") + 1; // `_`의 인덱스 + 1
            String FileName = fullFileName.substring(underscoreIndex);

            attachments.add(new BoardDetailResponse.AttachmentResponse(
                    FileName,
                    board.getFile_downloads(),
                    "/community/request/download/" + FileName
            ));
        }

        return new BoardDetailResponse(
                board.getRequest_id(),
                board.getRequest_title(),
                board.getCreate_by(),
                board.getCreate_at(),
                board.getRequest_hits(),
                board.getDonation_start_date(),
                board.getDonation_end_date(),
                board.getTarget_amount(),
                board.getCurrent_amount(),
                board.getRequest_likes(),
                board.getStatus().getText(),
                board.getRequest_content(),
                false,
                attachments
        );

    }
}
