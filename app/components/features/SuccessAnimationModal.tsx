//SuccessAnimationModal.tsx
import LottieView from "lottie-react-native";
import { Modal, View, StyleSheet, Text } from "react-native";
import Theme from "../../../interfaces/theme";
import { FontAwesome } from "@expo/vector-icons";
export const SuccessAnimationModal = ({
    visible,
    message,
    onFinish,
}: {
    visible: boolean;
    message: string;
    onFinish: () => void;
}) => {
    return (
        <Modal visible={visible} transparent animationType="fade" onRequestClose={onFinish}>
            <View style={styles.animationContainer}>
                <LottieView
                    source={require("../../assets/success.json")}
                    autoPlay
                    loop={false}
                    onAnimationFinish={onFinish}
                    style={styles.lottie}
                />
                <Text style={styles.text}>{message}</Text>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    animationContainer: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 1)",
        alignItems: "center",
        justifyContent: "center",
    },
    lottie: {
        width: "130%",
        height: "130%",
        position: "absolute",
        bottom: "-1%",
    },
    text:{
        color: Theme.CFL_white,
        position: "absolute",
        bottom: "20%",
        fontSize: 30,
        fontFamily: "FontAwesome",
        fontStyle:"italic",
    }
});
export default SuccessAnimationModal;
