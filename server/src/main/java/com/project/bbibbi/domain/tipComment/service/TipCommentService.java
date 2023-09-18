package com.project.bbibbi.domain.tipComment.service;

import com.project.bbibbi.domain.member.entity.Member;
import com.project.bbibbi.domain.member.repository.MemberRepository;
import com.project.bbibbi.domain.tipComment.dto.TipCommentDto;
import com.project.bbibbi.domain.tipComment.entity.TipComment;
import com.project.bbibbi.global.exception.tipexception.TipCommentNotFoundException;
import com.project.bbibbi.domain.tipComment.repository.TipCommentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
@Transactional
public class TipCommentService {

    private final TipCommentRepository tipCommentRepository;
    private final MemberRepository memberRepository;
    public TipComment saveComment(TipComment tipComment) {
        TipComment insertTipComment= tipCommentRepository.save(tipComment);

        Optional<Member> optionalMember = memberRepository.findById(tipComment.getMember().getMemberId());

        Member member = optionalMember.orElseThrow(() -> {throw new RuntimeException() ; });

        insertTipComment.setMember(Member.builder().memberId
                (tipComment.getMember().getMemberId()).nickname
                (member.getNickname()).build());

        return insertTipComment;
    }

    public TipCommentDto findComment(Long commentId) {
        TipComment comment = tipCommentRepository.findById(commentId)
                .orElseThrow(TipCommentNotFoundException::new);
        return TipCommentDto.builder()
                .tipCommentId(comment.getTipCommentId())
                .content(comment.getContent())
                .memberId(comment.getMember().getMemberId())
                .build();
    }

    public Optional<TipComment> findById(Long commentId) {
        return tipCommentRepository.findById(commentId);
    }

    public TipComment updateComment(Long commentId, TipCommentDto dto) {
        Optional<TipComment> optionalTipComment = tipCommentRepository.findById(commentId);

        if (optionalTipComment.isPresent()) {
            TipComment tipComment = optionalTipComment.get();

            // 새로운 내용으로 댓글을 수정합니다.
            tipComment.setContent(dto.getContent());

            // 수정된 댓글을 저장합니다.
            TipComment updateComment = tipCommentRepository.save(tipComment);
            return updateComment;
        } else {
            throw new TipCommentNotFoundException();
        }
    }
//    이렇게 하면 댓글을 찾지 못한 경우에 예외가 발생하며, 이를 적절하게 처리할 수 있습니다.
//    필요에 따라 반환값을 null로 설정하고 호출하는 측에서 처리하는 방법도 가능합니다.
    public void deleteComment(Long commentId) {
        TipComment comment = tipCommentRepository.findById(commentId)
                .orElseThrow(TipCommentNotFoundException::new);

        // 댓글을 삭제합니다.
        tipCommentRepository.deleteById(commentId);
    }

    public List<TipComment> getAllCommentsForTip(Long tipReplyId) {
        // 특정 게시물에 대한 댓글 목록을 조회합니다.
        return tipCommentRepository.findByTipReplyId(tipReplyId);
    }
    // 답글을 추가하는 메서드
    public TipComment addComment(Long parentCommentId, TipCommentDto dto) {
        // 부모 댓글을 찾습니다.
        TipComment parentComment = tipCommentRepository.findById(parentCommentId)
                .orElseThrow(TipCommentNotFoundException::new);

        // 새로운 답글을 생성합니다.
        TipComment tipComment = new TipComment();
        tipComment.setContent(dto.getContent());
        tipComment.setMember(parentComment.getMember());
        tipComment.setParentComment(parentComment.getTipCommentId()); // 부모 댓글 ID를 저장

        // 순서 (commentOrder)를 설정해야 한다면, 순서를 설정해줄 수 있습니다.
        // 예를 들어, 현재 부모 댓글의 답글 개수를 가져와서 commentOrder를 설정한다고 가정해봅시다.
        // tipComment.setCommentOrder(parentComment.getReplyCount() + 1);

        // 답글을 저장합니다.
        return tipCommentRepository.save(tipComment);
    }

}
