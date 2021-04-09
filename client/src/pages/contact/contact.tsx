import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import caibo from './pictures/caibo.png';
import leishijun from './pictures/leishijun.png';
import lixiaoqiong from './pictures/lixiaoqiong.png';
import luxiaohuan from './pictures/luxiaohuan.png';
import wangguobin from './pictures/wangguobin.png';
import wangxinyue from './pictures/wangxinyue.png';
import wangzheng from './pictures/wangzheng.png';
import xuluming from './pictures/xuluming.png';
import zoudanyi from './pictures/zoudanyi.png';
import {Typography} from "@material-ui/core";
import {fade} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  pageTitle: {
    padding: theme.spacing(2),
    fontWeight: 700,
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1),
    },
  },
  card: {
    width: `calc(100% - ${theme.spacing(2) * 2}px)`,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: fade(theme.palette.primary.main, 0.08),
    borderRadius: 15,
    overflow: 'hidden',
    margin: theme.spacing(2, 2),
    padding: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(1, 0),
      padding: theme.spacing(1),
    }
  },
  avatar: {
    '& img': {
      width: 'auto',
      height: 'auto'
    },
    padding: theme.spacing(2),
    borderRadius: 15,
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1),
    }
  },
  content: {
    margin: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(1),
    }
  },
  name: {
    fontWeight: 700,
    width: '100%',
    textAlign: 'start',
    marginBottom: theme.spacing(2)
  }
}));

const data = [
  {
    image: wangguobin,
    name: '王国斌',
    text: '医学博士，主任医师，二级教授，博士生导师。原华中科技大学同济医学院附属协和医院院长、湖北省微创外科临床研究中心主任、胃肠外科主任。全国人大代表、国家重点学科带头人、卫生部有突出贡献中青年专家、国务院特殊津贴专家、湖北省“楚天学者”。本项目技术研发负责人。'
  },
  {
    image: wangzheng,
    name: '王征',
    text: '医学博士，教授，主任医师，博士生导师，教育部“青年长江”学者、湖北省“楚天学者”特聘教授、湖北省“百人计划”专家。现任华中科技大学协和医院胃肠外科副主任，科研处副处长。主要研究方向为肿瘤侵袭转移机制研究、抗肿瘤药物纳米药物、胃癌和结直肠癌的精准治疗等。本项目负责人，全面负责整个项目的实施。'
  },
  {
    image: xuluming,
    name: '徐鲁明',
    text: '于2016年获得华中科技大学博士学位，2016年至2018年担任博士后。他目前是华中科技大学附属协和医院组织工程和再生医学研究中心的研究助理。他的研究重点是基因组学、生物信息学和生物工程技术在胃肠道疾病中的应用。本项目主要承担测序捕获探针的设计和有机培养体系的建立等工作。'
  },
  {
    image: caibo,
    name: '蔡博',
    text: '2011年至2017年在武汉大学物理科学与技术学院攻读博士学位，研究方向为微流控芯片技术。2017年7月入职华中科技大学同济医学院附属协和医院，任职助理研究员，主要从事微流控芯片在检验检测及生物医学工程方面的研究。在本项目中主要负责肿瘤病人类器官培养的微流控系统的设计研发以及基于该系统的药物筛选工作。'
  },
  {
    image: leishijun,
    name: '雷世俊',
    text: '2019年博士毕业于华中科技大学，现就职于华中科技大学同济医学院协和医院。他专注于利用多组学测序技术研究肿瘤侵袭和转移。本课题负责DNA测序和数据分析工作。'
  },
  {
    image: zoudanyi,
    name: '邹丹祎',
    text: '2020年博士毕业于华中科技大学。现就职于华中科技大学同济医学院协和医院检验科。主要从事肿瘤易感相关遗传因素研究及公共数据库构建。本项目主要负责网站设计与维护。'
  },
  {
    image: lixiaoqiong,
    name: '李孝琼',
    text: '华中科技大学同济医学院附属协和医院研究生在读。主要从事结直肠癌精准治疗研究。本项目中主要承担类器官平台构建。'
  },
  {
    image: luxiaohuan,
    name: '路小欢',
    text: '华中科技大学同济医学院附属协和医院在读博士研究生，主要从事结直肠肿瘤精准治疗研究，包括类器官培养构建及药物筛选等，主持华中科技大学研究生创新创业项目1项，参与多项课题研究。负责本项目分子生物学实验、肿瘤细胞学实验、动物实验等部分。'
  },
  {
    image: wangxinyue,
    name: '王星月',
    text: '华中科技大学临床检验诊断学2017级硕士，本科就读于广西医科大学医学检验专业。主要从事高通量测序研究，包括二代和三代测序，在本项目承担高通量测序及数据采集工作。'
  },
];

const Contact: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root} >
      <Typography variant={'h5'} component={'h2'} className={classes.pageTitle}>
        成员介绍
      </Typography>
      {
        data.map((obj, i) => (
          <div key={i} className={classes.card}>
            <div className={classes.avatar}>
              <img src={obj.image} alt={'头像'} />
            </div>
            <div className={classes.content}>
              <Typography variant={'h5'} component={'h3'} className={classes.name}>
                { obj.name }
              </Typography>
              <Typography variant={'body2'}>
                { obj.text }
              </Typography>
            </div>
          </div>
        ))
      }
    </div>
  )
};

export default Contact
