/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 80046
Source Host           : localhost:3306
Source Database       : club_db

Target Server Type    : MYSQL
Target Server Version : 80046
File Encoding         : 65001

Date: 2026-06-17 23:06:09
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for clubs
-- ----------------------------
DROP TABLE IF EXISTS `clubs`;
CREATE TABLE `clubs` (
  `club_id` int NOT NULL AUTO_INCREMENT,
  `club_name` varchar(255) NOT NULL,
  `club_type` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`club_id`),
  UNIQUE KEY `UK_club_name` (`club_name`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of clubs
-- ----------------------------
INSERT INTO `clubs` VALUES ('1', '篮球社', '体育类');
INSERT INTO `clubs` VALUES ('2', '足球社', '体育类');
INSERT INTO `clubs` VALUES ('3', '音乐社', '艺术类');
INSERT INTO `clubs` VALUES ('4', '舞蹈社', '艺术类');
INSERT INTO `clubs` VALUES ('5', '编程社', '科技类');
INSERT INTO `clubs` VALUES ('6', '志愿者协会', '公益类');
INSERT INTO `clubs` VALUES ('7', '摄影社', '兴趣类');

-- ----------------------------
-- Table structure for registers
-- ----------------------------
DROP TABLE IF EXISTS `registers`;
CREATE TABLE `registers` (
  `register_id` int NOT NULL AUTO_INCREMENT,
  `register_status` varchar(255) DEFAULT NULL,
  `club_id` int DEFAULT NULL,
  `student_id` int DEFAULT NULL,
  PRIMARY KEY (`register_id`),
  KEY `FK_club_id` (`club_id`),
  KEY `FK_student_id` (`student_id`),
  CONSTRAINT `FK_club_id` FOREIGN KEY (`club_id`) REFERENCES `clubs` (`club_id`) ON DELETE CASCADE,
  CONSTRAINT `FK_student_id` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of registers
-- ----------------------------
INSERT INTO `registers` VALUES ('1', '已报名', '1', '2');
INSERT INTO `registers` VALUES ('2', '已入团', '2', '2');
INSERT INTO `registers` VALUES ('3', '已报名', '3', '3');
INSERT INTO `registers` VALUES ('4', '已入团', '1', '3');
INSERT INTO `registers` VALUES ('5', '已取消', '5', '4');

-- ----------------------------
-- Table structure for students
-- ----------------------------
DROP TABLE IF EXISTS `students`;
CREATE TABLE `students` (
  `student_id` int NOT NULL AUTO_INCREMENT,
  `student_name` varchar(255) DEFAULT NULL,
  `student_num` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`student_id`),
  UNIQUE KEY `UK_student_num` (`student_num`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of students
-- ----------------------------
INSERT INTO `students` VALUES ('1', '管理员', 'admin', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92');
INSERT INTO `students` VALUES ('2', '李华', '2026111', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92');
INSERT INTO `students` VALUES ('3', '张三', '2026222', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92');
INSERT INTO `students` VALUES ('4', '李四', '2024333', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92');
INSERT INTO `students` VALUES ('5', '阿巴阿巴', '2026666', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92');
