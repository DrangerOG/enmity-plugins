import { FormRow, FormSection } from "enmity/components";
import { NavigationNative, React } from "enmity/metro/common";
import { Icons } from "../../common/components/_pluginSettings/utils";
import Logs from "./Logs";

export default function LogsToggle({ styles }) {
    const Navigation = NavigationNative.useNavigation();

    return (
        <FormSection title="Message Logs">
            <FormRow
                label="Open Message Log Viewer"
                subLabel="Tap to view deleted and edited messages. Long-press to copy."
                leading={<FormRow.Icon style={styles.icon} source={Icons.Settings.Logs} />}
                onPress={() => {
                    Navigation.push("EnmityCustomPage", {
                        pageName: "NoDelete Logs",
                        pagePanel: Logs,
                    });
                }}
            />
        </FormSection>
    );
}
