package com.redbox.domain.request.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.redbox.domain.request.dto.RequestFilter;
import com.redbox.domain.request.entity.Request;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class RequestRepositoryImpl implements RequestRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    @Override
    public Page<Request> searchBoards(RequestFilter requestFilter, Pageable pageable) {

        return null;
//        return new PageImpl<>(results, pageable, total);
    }
}
