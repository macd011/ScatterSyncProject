import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Animated,
  Easing,
} from "react-native";
import Modal from "react-native-modal";
import { Ionicons } from "@expo/vector-icons";
import { auth } from "../../firebaseConfig";
import { useRouter } from "expo-router";
import UserInfo from "./UserInfo";
import ChangePassword from "./ChangePassword";
import ChangeUsername from "./ChangeUsername";
import ChangeDob from "./ChangeDob";
import Communication from "./Communication";
import userStyles from "./../styles/userStyles";

interface Props {
  isVisible: boolean;
  onClose: () => void;
}

type DrawerView =
  | "main"
  | "info"
  | "password"
  | "username"
  | "dob"
  | "communication";

const UserDrawer = ({ isVisible, onClose }: Props) => {
  const router = useRouter();
  const [view, setView] = useState<DrawerView>("main");
  const translateX = useRef(new Animated.Value(0)).current;
  const viewStack = useRef<DrawerView[]>(["main"]);

  const animateTo = (direction: "forward" | "back") => {
    const toValue = direction === "forward" ? -50 : 50;
    Animated.sequence([
      Animated.timing(translateX, {
        toValue,
        duration: 120,
        easing: Easing.out(Easing.poly(4)),
        useNativeDriver: true,
      }),
      Animated.timing(translateX, {
        toValue: 0,
        duration: 180,
        easing: Easing.out(Easing.poly(4)),
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleNavigate = (nextView: DrawerView) => {
    animateTo("forward");
    viewStack.current.push(nextView);
    setView(nextView);
  };

  const handleBack = () => {
    if (viewStack.current.length > 1) {
      viewStack.current.pop();
      animateTo("back");
      setView(viewStack.current[viewStack.current.length - 1]);
    } else {
      onClose();
    }
  };

  const handleLogout = async () => {
    await auth.signOut();
    onClose();
    router.replace("/(auth)/LoginScreen");
  };

  const renderMainDrawer = () => (
    <ScrollView contentContainerStyle={userStyles.content}>
      <Text style={userStyles.sectionTitle}>Settings</Text>

      <TouchableOpacity style={userStyles.link} onPress={() => handleNavigate("info")}>
        <Ionicons name="person-circle-outline" size={22} color="#555" />
        <Text style={userStyles.linkText}>User Information</Text>
      </TouchableOpacity>

      <TouchableOpacity style={userStyles.link} onPress={() => handleNavigate("communication")}>
        <Ionicons name="chatbubble-ellipses-outline" size={22} color="#555" />
        <Text style={userStyles.linkText}>Communication</Text>
      </TouchableOpacity>

      <TouchableOpacity style={userStyles.link}>
        <Ionicons name="sync-outline" size={22} color="#555" />
        <Text style={userStyles.linkText}>Sync</Text>
      </TouchableOpacity>

      <TouchableOpacity style={userStyles.logout} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={20} color="#fff" />
        <Text style={userStyles.logoutText}>Log out</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  const renderContent = () => {
    switch (view) {
      case "info":
        return (
          <UserInfo
            onBack={handleBack}
            onChangePasswordPress={() => handleNavigate("password")}
            onChangeUsernamePress={() => handleNavigate("username")}
            onChangeDobPress={() => handleNavigate("dob")}
          />
        );
      case "communication":
        return <Communication onBack={handleBack} />;
      case "password":
        return <ChangePassword onBack={handleBack} />;
      case "username":
        return <ChangeUsername onBack={handleBack} />;
      case "dob":
        return <ChangeDob onBack={handleBack} />;
      default:
        return renderMainDrawer();
    }
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onSwipeComplete={onClose}
      swipeDirection="down"
      style={userStyles.modal}
      propagateSwipe
      animationIn="slideInUp"
      animationOut="slideOutDown"
      avoidKeyboard
    >
      <View style={userStyles.sheet}>
        <View style={userStyles.handle} />
        <Animated.View style={{ transform: [{ translateX }] }}>
          {renderContent()}
        </Animated.View>
      </View>
    </Modal>
  );
};

export default UserDrawer;
