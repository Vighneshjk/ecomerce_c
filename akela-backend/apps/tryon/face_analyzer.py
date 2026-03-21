import cv2
import mediapipe as mp
import numpy     as np
import base64
import logging

logger = logging.getLogger(__name__)

class FaceAnalyzer:
    def __init__(self):
        self.mp_face_mesh = mp.solutions.face_mesh
        self.face_mesh    = self.mp_face_mesh.FaceMesh(
            static_image_mode        = True,
            max_num_faces            = 1,
            refine_landmarks         = True,
            min_detection_confidence = 0.5,
        )

    def process_frame(self, image_data):
        try:
            # Decode base64
            img_bytes = base64.b64decode(image_data.split(',')[-1])
            nparr     = np.frombuffer(img_bytes, np.uint8)
            image     = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

            if image is None: return {'error': 'Invalid image'}

            rgb_image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
            results   = self.face_mesh.process(rgb_image)

            if not results.multi_face_landmarks:
                return {'error': 'No face detected'}

            landmarks  = results.multi_face_landmarks[0]
            face_shape = self._classify_face_shape(landmarks)
            pupillary_distance = self._calculate_pd(landmarks, image.shape[1])

            return {
                'face_shape': face_shape,
                'pd':         round(pupillary_distance, 2),
                'success':    True,
            }
        except Exception as e:
            logger.error(f'Face analysis failed: {e}')
            return {'error': str(e)}

    def _calculate_pd(self, landmarks, width):
        # 468, 473 are iris centers
        p1 = landmarks.landmark[468]
        p2 = landmarks.landmark[473]
        dist = np.sqrt((p1.x - p2.x)**2 + (p1.y - p2.y)**2)
        # Average adult PD is ~63mm. This is a heuristic.
        return dist * width * 0.11

    def _classify_face_shape(self, landmarks):
        # Simplified classification based on width/height ratios
        top    = landmarks.landmark[10].y
        bottom = landmarks.landmark[152].y
        left   = landmarks.landmark[234].x
        right  = landmarks.landmark[454].x

        face_h = bottom - top
        face_w = right - left
        ratio  = face_w / face_h

        if ratio > 0.85:   return 'round'
        if ratio < 0.75:   return 'oval'
        if ratio > 0.80:   return 'square'
        return 'heart'
