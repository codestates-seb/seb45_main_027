package com.project.bbibbi.domain.follow.service;

import com.project.bbibbi.domain.follow.entity.Follow;
import com.project.bbibbi.domain.follow.repository.FollowRepository;
import com.project.bbibbi.domain.member.entity.Member;
import com.project.bbibbi.domain.member.repository.MemberRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
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

        // 로그인사용자가 타인을 팔로우 한 것을 TORIGHT로 지정.
        for(Follow follow : follows){
            follow.setFollowGubun("TORIGHT");
        }

        return follows;
    }

    public List<Follow> findToFollow(Long memberId){
        List<Follow> follows = followRepository.findByMemberId(memberId);

        List<Follow> fromFollows = followRepository.findByFromMemberId(memberId);

        List<Long> fromFollowsTargetMemberIds = new ArrayList<>();

        // 로그인한 사용자가 타인을 팔로우 하지 않았지만 타인이 로그인사용자를 팔로우 했을 경우 TOLEFT
        // 로그인한 사용자와 타인이 서로 팔로우 했을 경우 CROSS

        // 로그인한 사용자가 팔로우한 사람을 뽑는다.
        for(Follow follow : fromFollows){

            fromFollowsTargetMemberIds.add(follow.getMember().getMemberId());

        }

        // 로그인한 사용자를 팔로우한 사람중에, 로그인한 사용자가 팔로우한 사람이 있는지 비교한다.
        // 있으면 구분값을 CROSS로, 없으면 TOLEFT
        for(Follow follow1 : follows){

            follow1.setFollowGubun("TOLEFT");

            for(Long targetMemberId : fromFollowsTargetMemberIds){

                if(targetMemberId == follow1.getFromMember().getMemberId()){

                    follow1.setFollowGubun("CROSS");
                    break;
                }
            }
        }

        return follows;
    }
}
