package com.project.bbibbi.domain.follow.service;

import com.project.bbibbi.domain.follow.entity.Follow;
import com.project.bbibbi.domain.follow.repository.FollowRepository;
import com.project.bbibbi.domain.member.entity.Member;
import com.project.bbibbi.domain.member.repository.MemberRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
@Service
public class FollowService {
    private final FollowRepository followRepository;
    private final MemberRepository memberRepository;

    public FollowService(FollowRepository followRepository, MemberRepository memberRepository) {
        this.followRepository = followRepository;
        this.memberRepository = memberRepository;
    }

    public Follow settingFollow(Follow follow){

        Integer existCount = followRepository.existCount(follow.getFromMember().getMemberId(), follow.getMember().getMemberId());

        if(existCount == 0){
            followRepository.save(follow);
        }
        else {
            followRepository.deleteByFromMemberIdAndMemberId(follow.getFromMember().getMemberId(), follow.getMember().getMemberId());
        }

        Follow setFollow = new Follow();

        Member fromMember = followRepository.fromMember(follow.getFromMember().getMemberId());
        Member toMember = followRepository.toMember(follow.getMember().getMemberId());
        setFollow.setFromMember(fromMember);
        setFollow.setMember(toMember);

        setFollow.setCreatedDateTime(follow.getCreatedDateTime());

        Integer updateAfterExistCount = followRepository.existCount(follow.getFromMember().getMemberId(), follow.getMember().getMemberId());

        if(updateAfterExistCount == 0){
            setFollow.setFollowYn(false);
        }
        else {
            setFollow.setFollowYn(true);
        }

        return setFollow;
    }

    public List<Follow> findFromFollow(Long memberId){
        List<Follow> follows = followRepository.findByFromMemberId(memberId);

        return follows;
    }

    public List<Follow> findToFollow(Long memberId){
        List<Follow> follows = followRepository.findByMemberId(memberId);

        return follows;
    }
}
