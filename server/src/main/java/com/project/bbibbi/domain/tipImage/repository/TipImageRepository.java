package com.project.bbibbi.domain.tipImage.repository;

import com.project.bbibbi.domain.tipImage.entity.TipImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TipImageRepository extends JpaRepository<TipImage, Long> {

}