package com.project.bbibbi.domain.tip.mapper;

import com.project.bbibbi.auth.utils.loginUtils;
import com.project.bbibbi.domain.tipComment.dto.TipCommentDto;
import com.project.bbibbi.domain.tipComment.entity.TipComment;
import com.project.bbibbi.domain.tipReply.dto.TipReplyResponseDto;
import com.project.bbibbi.domain.tipReply.entity.TipReply;
import com.project.bbibbi.domain.member.entity.Member;
import com.project.bbibbi.domain.tip.dto.TipPatchDto;
import com.project.bbibbi.domain.tip.dto.TipPostDto;
import com.project.bbibbi.domain.tip.dto.TipResponseDto;
import com.project.bbibbi.domain.tip.entity.Tip;
import com.project.bbibbi.domain.tipReply.dto.TipReplyResponseDto;
import com.project.bbibbi.domain.tipReply.entity.TipReply;
import com.project.bbibbi.domain.tipTag.dto.TagDto;
import com.project.bbibbi.domain.tipTag.entity.Tag;
import org.mapstruct.Mapper;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Mapper(componentModel = "spring")
public interface TipMapper {
//    TipMapper INSTANCE = Mappers.getMapper(TipMapper.class);

//    Tip tipPostDtoToTip(TipPostDto tipPostDto);
//
//    Tip tipPatchDtoToTip(TipPatchDto tipPatchDto);
//
//    TipResponseDto tipToTipResponseDto(Tip tip);
//
//    List<TipResponseDto> mapToResponseDtoList(List<Tip> tips);

    default Tip tipPostDtoToTip(TipPostDto tipPostDto){
        if(tipPostDto == null){
            return null;
        }

        Tip tip = new Tip();

        tip.setTitle(tipPostDto.getTitle());
        tip.setCoverPhoto(tipPostDto.getCoverPhoto());
        tip.setContent(tipPostDto.getContent());
//        tip.setMember(Member.builder().memberId(tipPostDto.getMemberId()).build());

        //멤버 아이디 가져오기
        Long memberId = loginUtils.getLoginId();
        tip.setMember(Member.builder().memberId(memberId).build());

//        List<TipImage> tipImages = new ArrayList<>();
//
//        for(TipImageDto tipImageDto : tipPostDto.getTipImages()){
//            TipImage tipImage = new TipImage();
//
//            tipImage.setImage(tipImageDto.getImage());
//            tipImage.setTip(tip);
//            tipImage.setCreatedDateTime(LocalDateTime.now());
//
//            tipImages.add(tipImage);
//        }
//
//        tip.setTipImages(tipImages);

        if(tipPostDto.getTagContents() != null){

            List<Tag> tags = new ArrayList<>();
            for( String s : tipPostDto.getTagContents()){
                Tag tag = new Tag();
                if(s.toCharArray()[0] == '#') {
                    tag.setTagContent(s.substring(1));
                }
                else {
                    tag.setTagContent(s);
                }
                tag.setTip(tip);
                tags.add(tag);
            }

            tip.setTags(tags);
        }

        tip.setCreatedDateTime(LocalDateTime.now());

        return tip;

    }

    default Tip tipPatchDtoToTip(TipPatchDto tipPatchDto){
        if(tipPatchDto == null) {
            return null;
        }

        Tip tip = new Tip();

        tip.setTitle(tipPatchDto.getTitle());
        tip.setCoverPhoto(tipPatchDto.getCoverPhoto());
        tip.setContent(tipPatchDto.getContent());
//        tip.setMember(Member.builder().memberId(tipPatchDto.getMemberId()).build());

        //멤버 아이디 가져오기
        Long memberId = loginUtils.getLoginId();
        tip.setMember(Member.builder().memberId(memberId).build());

//        List<TipImage> tipImages = new ArrayList<>();
//
//        for(TipImageDto tipImageDto : tipPatchDto.getTipImages()){
//            TipImage tipImage = new TipImage();
//
//            tipImage.setImage(tipImageDto.getImage());
//            tipImage.setTip(tip);
//            tipImage.setCreatedDateTime(LocalDateTime.now());
//            tipImage.setModifiedDateTime(LocalDateTime.now());
//
//            tipImages.add(tipImage);
//        }
//
//        tip.setTipImages(tipImages);

        if(tipPatchDto.getTagContents() != null){

            List<Tag> tags = new ArrayList<>();
            for( String s : tipPatchDto.getTagContents()){
                Tag tag = new Tag();
                if(s.toCharArray()[0] == '#') {
                    tag.setTagContent(s.substring(1));
                }
                else {
                    tag.setTagContent(s);
                }
                tag.setTip(tip);
                tags.add(tag);
            }

            tip.setTags(tags);
        }

        tip.setModifiedDateTime(LocalDateTime.now());

        return tip;
    }

    default TipResponseDto tipToTipResponseDto(Tip tip){
        if(tip == null){
            return null;
        }

        TipResponseDto tipResponseDto = new TipResponseDto();

        tipResponseDto.setTipId(tip.getTipId());
        tipResponseDto.setTitle(tip.getTitle());
        tipResponseDto.setCoverPhoto(tip.getCoverPhoto());
        tipResponseDto.setContent(tip.getContent());
        tipResponseDto.setViews(tip.getViews());
        tipResponseDto.setMemberId(tip.getMember().getMemberId());
        tipResponseDto.setNickname(tip.getMember().getNickname());
        tipResponseDto.setMemberImage(tip.getMember().getProfileImg());
        tipResponseDto.setMyIntro(tip.getMember().getMyIntro());
        tipResponseDto.setCreatedDateTime(tip.getCreatedDateTime());
        tipResponseDto.setModifiedDateTime(tip.getModifiedDateTime());
        tipResponseDto.setLikeCount(tip.getLikeCount());
        tipResponseDto.setLikeYn(tip.getLikeYn());
        tipResponseDto.setBookmarkCount(tip.getBookmarkCount());
        tipResponseDto.setBookmarkYn(tip.getBookmarkYn());
        tipResponseDto.setRepliesCount( (tip.getReplies() == null) ? 0: tip.getReplies().size());
        tipResponseDto.setFollowYn(tip.getFollowYn());
        tipResponseDto.setFixYn(tip.getFixYn());

        if(tip.getTags() != null){
            List<TagDto> tagDtos = new ArrayList<>();

            for(Tag tag : tip.getTags()){
                TagDto tagDto = new TagDto();

                tagDto.setTagId(tag.getTagId());
                tagDto.setTagContent(tag.getTagContent());

                tagDtos.add(tagDto);

            }

            tipResponseDto.setTags(tagDtos);

        }


//        List<TipImageDto> tipImageDtos = new ArrayList<>();
//
//        for(TipImage tipImage : tip.getTipImages()){
//            TipImageDto tipImageDto = new TipImageDto(tipImage.getTipImageId()
//                    ,tipImage.getImage()
//                    ,tipImage.getTip().getTipId()
//                    ,tipImage.getCreatedDateTime()
//                    ,tipImage.getModifiedDateTime());
//
//            tipImageDtos.add(tipImageDto);
//        }
//
//        tipResponseDto.setTipImages(tipImageDtos);

        if(tip.getReplies() != null) {

            List<TipReplyResponseDto> allReplies = new ArrayList<>();
            for (TipReply tipReply : tip.getReplies()) {
                TipReplyResponseDto tipReplyResponseDto = new TipReplyResponseDto();
                tipReplyResponseDto.setTipReplyId(tipReply.getTipReplyId());
                tipReplyResponseDto.setContent(tipReply.getContent());
                tipReplyResponseDto.setNickname(tipReply.getMember().getNickname());
                tipReplyResponseDto.setTipId(tipReply.getTip().getTipId());
                tipReplyResponseDto.setMemberId(tipReply.getMember().getMemberId());
                tipReplyResponseDto.setCreatedDateTime(tipReply.getCreatedDateTime());
                tipReplyResponseDto.setModifiedDateTime(tipReply.getModifiedDateTime());
                tipReplyResponseDto.setMemberImage(tipReply.getMember().getProfileImg());
                tipReplyResponseDto.setReplyLikeYn(tipReply.getReplyLikeYn());
                if (tipReply.getComments() != null) {
                    List<TipCommentDto> allComments = new ArrayList<>(); // TipCommentDto 타입으로 리스트 생성
                    for (TipComment tipComment : tipReply.getComments()) {
                        TipCommentDto commentDto = new TipCommentDto(); // TipCommentDto 객체 생성
                        commentDto.setTipCommentId(tipComment.getTipCommentId());
                        commentDto.setContent(tipComment.getContent());
                        commentDto.setParentComment(tipComment.getParentComment());
                        commentDto.setCommentOrder(tipComment.getParentComment());
                        commentDto.setNickname(tipComment.getMember().getNickname());
                        commentDto.setTipId(tipComment.getTip().getTipId());
                        commentDto.setTipReplyId(tipComment.getTipReply().getTipReplyId());
                        commentDto.setMemberId(tipComment.getMember().getMemberId());
                        commentDto.setMemberImage(tipComment.getMember().getProfileImg());
                        commentDto.setCreatedDateTime(tipComment.getCreatedDateTime());
                        commentDto.setModifiedDateTime(tipComment.getModifiedDateTime());
                        allComments.add(commentDto);
                    }
                    tipReplyResponseDto.setComments(allComments); // TipReplyResponseDto에 TipCommentDto 리스트 설정
                }
                allReplies.add(tipReplyResponseDto);
            }
            tipResponseDto.setReplies(allReplies);
        }

        tipResponseDto.setCreatedDateTime(tip.getCreatedDateTime());
        tipResponseDto.setModifiedDateTime(tip.getModifiedDateTime());

        return tipResponseDto;

    }

}