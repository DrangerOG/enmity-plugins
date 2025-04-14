import { ScrollView, Text, View } from "react-native";
import { React } from "enmity/metro/common";
import { Icons } from "../../common/components/_pluginSettings/utils";
import { StyleSheet } from "enmity/metro/common";

const Logs = ({ styles }) => {
    const logs = []; // Retrieve stored logs from your custom log storage

    return (
        <ScrollView style={styles.scrollView}>
            {logs.length === 0 ? (
                <Text style={styles.emptyText}>No logs available</Text>
            ) : (
                logs.map((log, index) => {
                    // Check for deleted or edited messages
                    const isDeleted = log.originalMessage === "" || log.content.includes("[deleted]");
                    const isEdited = log.originalMessage !== log.editedMessage;

                    return (
                        <View
                            key={index}
                            style={[styles.logItem, isDeleted && styles.deletedMessage]}
                        >
                            {/* Display the username and message content */}
                            <Text style={styles.username}>
                                {log.username}
                            </Text>
                            <Text style={styles.message}>
                                {isDeleted
                                    ? "[Deleted Message]"
                                    : isEdited
                                    ? `${log.originalMessage} → ${log.editedMessage}`
                                    : log.originalMessage}
                            </Text>
                            <Text style={styles.timestamp}>
                                {new Date(log.timestamp).toLocaleString()}
                            </Text>
                        </View>
                    );
                })
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        padding: 10,
    },
    emptyText: {
        textAlign: "center",
        color: "#888",
        marginTop: 20,
    },
    logItem: {
        marginBottom: 10,
        padding: 10,
        borderRadius: 8,
        backgroundColor: "#f5f5f5",
    },
    deletedMessage: {
        backgroundColor: "#ffcccc", // Light red background for deleted messages
    },
    username: {
        fontWeight: "bold",
        marginBottom: 5,
    },
    message: {
        marginBottom: 5,
        color: "#333",
    },
    timestamp: {
        fontSize: 12,
        color: "#888",
    },
});

export default Logs;
