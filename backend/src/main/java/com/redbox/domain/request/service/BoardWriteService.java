package com.redbox.domain.request.service;

import com.redbox.domain.request.dto.BoardResponse;
import com.redbox.domain.request.dto.BoardWriteRequest;
import com.redbox.domain.request.dto.RequestFilter;
import com.redbox.domain.request.entity.Board;
import com.redbox.domain.request.dto.Filter;
import com.redbox.domain.request.entity.Priority;
import com.redbox.domain.request.entity.Status;
import com.redbox.domain.request.repository.BoardWriteRepository;
import com.redbox.global.entity.PageResponse;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class BoardWriteService {

    // application.properties에서 설정 읽기
    @Value("${spring.file.upload-dir}")
    private String uploadDir;

    private final BoardWriteRepository boardWriteRepository;

    /// 게시글 등록
    public void saveBoard(BoardWriteRequest boardWriteRequest, MultipartFile file) {

        String filePath = null;

        if (file != null && !file.isEmpty()) {
            filePath = saveFile(file);
        }

        // DTO를 엔티티로 변환
        Board board = new Board(
                0L, // ID 자동 생성

                // TODO : user 관련 변경 필요 (임의 값 넣어둠)
                // user_id, 등록자
                1,

                boardWriteRequest.getRequest_title(), // 제목
                boardWriteRequest.getRequest_content(), // 내용
                boardWriteRequest.getTarget_amount(), // 목표 수량

                0, // current_amount 초기값 0

                Status.Request, // 기본 상태
                LocalDate.now(), // 생성일(현재 날짜)

                "SYSTEM", // 등록자

                null, // 수정일 초기값 null
                null, // 수정자 초기값 null

                boardWriteRequest.getDonation_start_date(),
                boardWriteRequest.getDonation_end_date(),

                filePath, // 로컬 저장

                Priority.Medium, // 기본 중요도

                0, // 조회수 초기값 0
                0 // 좋아요 초기값 0
        );

        // 데이터베이스에 저장
        boardWriteRepository.save(board);
    }

    public String saveFile(MultipartFile file) {
        try {
            // 파일 이름 생성
            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            String filePath = uploadDir + File.separator + fileName; // 파일 저장 경로

            // 디렉토리 없을시 생성
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

    public PageResponse<BoardResponse> getRequests(int page, int size, RequestFilter request) {
        Pageable pageable = PageRequest.of(page -1, size, Sort.by("createdAt").descending());
        // 동적쿼리로 처리하기
        Page<Board> boardPage = boardWriteRepository.findAll(pageable);
        Page<BoardResponse> responsePage = boardPage.map(BoardResponse::new);
        return new PageResponse<>(responsePage);
    }
}
