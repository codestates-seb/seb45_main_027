package com.project.bbibbi.domain.tipTag.service;

import com.project.bbibbi.domain.tip.entity.Tip;
import com.project.bbibbi.domain.tipTag.entity.Tag;
import com.project.bbibbi.domain.tipTag.entity.TipTag;
import com.project.bbibbi.domain.tipTag.repository.TipTagRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
@Service
public class TipTagService {
    private final TagService tagService;

    private final TipTagRepository tipTagRepository;

    public TipTagService(TagService tagService, TipTagRepository tipTagRepository) {
        this.tagService = tagService;
        this.tipTagRepository = tipTagRepository;
    }

    public void saveTags(Tip tip, List<String> tagContents) {
        if (tagContents.isEmpty()) {
            return;
        }

        tagContents.stream()
                .map(tag ->
                        tagService.findByTagContent(tag)
                                .orElseGet(() -> tagService.save(tag)))
                .forEach(tag -> mapTagToTip(tip, tag));
    }

    private TipTag mapTagToTip(Tip tip, Tag tag) {
        return tipTagRepository.save(new TipTag(tip, tag));
    }

    public List<TipTag> findTagListByTip(Tip tip) {
        return tipTagRepository.findAllByTip(tip);
    }
}

