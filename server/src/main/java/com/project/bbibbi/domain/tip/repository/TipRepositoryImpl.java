package com.project.bbibbi.domain.tip.repository;

import com.project.bbibbi.domain.tip.entity.Tip;
import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.PathBuilder;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Repository;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;

import static com.project.bbibbi.domain.tip.entity.QTip.tip;
import static com.project.bbibbi.domain.tipTag.entity.QTag.tag;

@Repository
@RequiredArgsConstructor
public class TipRepositoryImpl implements TipRepositoryCustom {
    private final JPAQueryFactory queryFactory;

    @Override
    public Slice<Tip> findAllTipsPageableOrderByCreatedAtDesc(String searchString, Pageable pageable) {
        JPAQuery<Tip> tipQuery = queryFactory
                .selectFrom(tip)
                .where(searchStringContains(searchString))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize() + 1); // limit보다 한 개 더 가져옵니다.

        for (Sort.Order o : pageable.getSort()) {
            PathBuilder pathBuilder = new PathBuilder(tip.getType(), tip.getMetadata());
            tipQuery.orderBy(new OrderSpecifier<>(o.isAscending() ? Order.ASC : Order.DESC, pathBuilder.get(o.getProperty())));
        }

        List<Tip> content = new ArrayList<>(tipQuery.fetch());
        boolean hasNext = false;

        // 마지막 페이지는 사이즈가 항상 작습니다.
        if (content.size() > pageable.getPageSize()) {
            content.remove(pageable.getPageSize());
            hasNext = true;
        }

        return new SliceImpl<>(content, pageable, hasNext);
    }

    // 동적 쿼리를 위한 BooleanExpression
    private BooleanExpression searchStringContains(String searchString) {
        return StringUtils.isEmpty(searchString) ? null : tip.title.contains(searchString)
                .or(tip.content.contains(searchString))
                .or(tag.tagContent.contains(searchString));
    }
}