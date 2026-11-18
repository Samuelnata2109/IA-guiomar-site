import { motion, useReducedMotion } from "motion/react";
import type { Course } from "../../data/courses";
import Modal from "../../components/ui/Modal";
import ActivityGallery from "../../components/ui/ActivityGallery";
export default function CourseModal({
  course,
  open,
  onClose,
  onAfterClose,
}: {
  course: Course;
  open: boolean;
  onClose: () => void;
  onAfterClose: () => void;
}) {
  const reduced = useReducedMotion();
  const reveal = {
    closed: { opacity: 0, y: reduced ? 0 : 12 },
    open: { opacity: 1, y: 0 },
  };
  return (
    <Modal
      open={open}
      onClose={onClose}
      onAfterClose={onAfterClose}
      title={`${course.number} / ${course.name}`}
      className="course-modal"
    >
      <div className="course-modal-grid">
        <div className="course-modal-copy">
          <motion.span variants={reveal} className="mini-label">
            {course.tag}
          </motion.span>
          <motion.h2 variants={reveal}>
            {course.name}
            <span className="purple-dot">.</span>
          </motion.h2>
          <motion.p variants={reveal}>
            {course.description} {course.detail}
          </motion.p>
          <motion.div variants={reveal}>
            <h3>O que explorar</h3>
            <ul>
              {course.topics.map((topic) => (
                <li key={topic}>{topic}</li>
              ))}
            </ul>
          </motion.div>
          <motion.div variants={reveal}>
            <h3>Da ideia à prática</h3>
            <ul>
              {course.activities.map((activity) => (
                <li key={activity}>{activity}</li>
              ))}
            </ul>
          </motion.div>
          <motion.div variants={reveal}>
            <h3>Ferramentas e tecnologias</h3>
            <div className="chips">
              {course.tools.map((tool) => (
                <span key={tool}>{tool}</span>
              ))}
            </div>
          </motion.div>
          <p className="education-note">
            Conteúdos e atividades sugeridos para exploração. Não representam
            confirmação da matriz curricular nem registros de trabalhos já
            realizados pelos estudantes.
          </p>
        </div>
        <motion.div variants={reveal} className="course-modal-gallery">
          <ActivityGallery course={course} active={open} />
        </motion.div>
      </div>
    </Modal>
  );
}
