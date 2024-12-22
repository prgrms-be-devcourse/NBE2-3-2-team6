package com.redbox.domain.request.service;

import com.redbox.domain.request.dto.BoardWriteRequest;
import com.redbox.domain.request.entity.Board;
import com.redbox.domain.request.repository.BoardWriteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.time.LocalDate;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BoardModifyService {

    @Value("${spring.file.upload-dir}")
    private String uploadDir;

    private final BoardWriteRepository boardWriteRepository;

    /// 게시글 수정
    public void modifyBoard(Long id, BoardWriteRequest boardWriteRequest, MultipartFile file) {

        // 기존 게시글 조회
        Optional<Board> optionalBoard = boardWriteRepository.findById(id);
        if (optionalBoard.isEmpty()) {
            throw new RuntimeException("Board not found");
        }

        Board board = optionalBoard.get();

        // 수정된 값으로 설정
        board.setRequest_title(boardWriteRequest.getRequest_title());
        board.setRequest_content(boardWriteRequest.getRequest_content());
        board.setDonation_start_date(boardWriteRequest.getDonation_start_date());
        board.setDonation_end_date(boardWriteRequest.getDonation_end_date());
        board.setTarget_amount(boardWriteRequest.getTarget_amount());
        board.setUpdate_at(LocalDate.now());
        board.setUpdate_by("SYSTEM"); // Replace with the actual user ID or name when available

        // 파일 처리
        if (file != null && !file.isEmpty()) {
            String filePath = saveFile(file);
            board.setRequest_attach_file(filePath);
        }

        // 데이터베이스에 저장
        boardWriteRepository.save(board);
    }

    private String saveFile(MultipartFile file) {
        try {
            // 파일 이름 생성
            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            String filePath = uploadDir + File.separator + fileName; // 파일 저장 경로

            // 디렉토리 없을 시 생성
            File dest = new File(filePath);
            if (!dest.getParentFile().exists()) {
                dest.getParentFile().mkdirs();
            }

            file.transferTo(dest); // 파일 저장
            return filePath;

        } catch (IOException e) {
            throw new RuntimeException("파일 저장 중 오류가 발생했습니다.", e);
        }
    }
}
