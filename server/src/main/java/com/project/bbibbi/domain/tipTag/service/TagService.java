package com.project.bbibbi.domain.tipTag.service;

import com.project.bbibbi.domain.tipTag.entity.Tag;
import com.project.bbibbi.domain.tipTag.repository.TagRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Transactional
@Service
public class TagService {
    private final TagRepository tagRepository;

    public TagService(TagRepository tagRepository) {
        this.tagRepository = tagRepository;
    }

    public Optional<Tag> findByTagContent(String tagContent) {
        return tagRepository.findByTagContent(tagContent);
    }

    public Tag save(String tagContent) {
        return tagRepository.save(
                Tag.builder()
                        .tagContent(tagContent)
                        .build());
    }
}
