function V(e){window.enmity.plugins.registerPlugin(e)}const _={byProps:(...e)=>window.enmity.modules.filters.byProps(...e),byName:(e,t)=>window.enmity.modules.filters.byName(e,t),byTypeName:(e,t)=>window.enmity.modules.filters.byTypeName(e,t),byDisplayName:(e,t)=>window.enmity.modules.filters.byDisplayName(e,t)};function P(...e){return window.enmity.modules.bulk(...e)}function I(...e){return window.enmity.modules.getByProps(...e)}window.enmity.modules.common;function H(e){return window.enmity.patcher.create(e)}const p=window.enmity.modules.common.Constants;window.enmity.modules.common.Clipboard,window.enmity.modules.common.Assets,window.enmity.modules.common.Messages,window.enmity.modules.common.Clyde,window.enmity.modules.common.Avatars;const R=window.enmity.modules.common.Native,n=window.enmity.modules.common.React;window.enmity.modules.common.Dispatcher;const T=window.enmity.modules.common.Storage,w=window.enmity.modules.common.Toasts,D=window.enmity.modules.common.Dialog;window.enmity.modules.common.Token;const B=window.enmity.modules.common.REST;window.enmity.modules.common.Settings,window.enmity.modules.common.Users;const O=window.enmity.modules.common.Navigation;window.enmity.modules.common.NavigationNative,window.enmity.modules.common.NavigationStack,window.enmity.modules.common.Theme,window.enmity.modules.common.Linking;const k=window.enmity.modules.common.StyleSheet;window.enmity.modules.common.ColorMap,window.enmity.modules.common.Components,window.enmity.modules.common.Locale,window.enmity.modules.common.Profiles,window.enmity.modules.common.Lodash,window.enmity.modules.common.Logger,window.enmity.modules.common.Flux,window.enmity.modules.common.SVG,window.enmity.modules.common.Scenes;var G="HideBlockedMessages",Y="1.3.5",j="For when you really need to shut someone the f*** up.",z=[{name:"Marek (modified by spin)",id:"308440976723148800"}],W="#ff0069",X="https://raw.githubusercontent.com/spinfal/enmity-plugins/master/dist/HideBlockedMessages.js",l={name:G,version:Y,description:j,authors:z,color:W,sourceUrl:X};function q(e,t,i){return window.enmity.settings.getBoolean(e,t,i)}const M=e=>{let t=0;for(let i in e)t++;return t},J=e=>{let t=e.split(`
`).map(i=>{if(i!="")return`"${i.replaceAll(":",'":"').replace(" ","")}",`});return t[0]=`{${t[0]}`,t[M(t)]=`${t[M(t)]}}`,t=t.join(""),t=t.replaceAll("undefined",""),t=t.split("").reverse().join("").replace(",","").split("").reverse().join(""),t};async function K(){try{let e=await T.getItem("device_list");if(e)return JSON.parse(e);let t=(await B.get("https://gist.githubusercontent.com/adamawolf/3048717/raw/1ee7e1a93dff9416f6ff34dd36b0ffbad9b956e9/Apple_mobile_device_types.txt")).text,i=J(t);await T.setItem("device_list",i);let r=await T.getItem("device_list");return JSON.parse(r)}catch(e){console.warn(`[SpinsPlugins Local Error \u2014 Issue when getting devices: ${e}]`);return}}async function Q(e,t){let i=await K();return`**[${e}] Debug Information**
> **Plugin Version:** ${t}
> **Software Version:** ${R.DCDDeviceManager.systemVersion}
> **Device:** ${i[R.DCDDeviceManager.device]}`}function m(e){return window.enmity.assets.getIDByName(e)}const c={Debug:m("debug"),Retry:m("ic_message_retry"),Failed:m("Small"),Cancel:m("ic_megaphone_nsfw_16px"),Delete:m("ic_message_delete"),Copy:m("toast_copy_link"),Open:m("ic_leave_stage"),Clipboard:m("pending-alert"),Debug_Command:{Sent:m("ic_application_command_24px"),Clock:m("clock")},Settings:{Toasts:{Context:m("toast_image_saved"),Settings:m("ic_selection_checked_24px")},Debug:m("ic_rulebook_16px")}},N=e=>{w.open({content:`Copied ${e} to clipboard.`,source:c.Clipboard})},{native:v}=window.enmity;function Z(){v.reload()}v.version,v.build,v.device,v.version;async function ee({manifest:e}){const t=`${e.sourceUrl}?${Math.floor(Math.random()*1001)}.js`;let i=(await(await B.get(t)).text).match(/[0-9].[0-9].[0-9]/g);!i||(i=i[0].replaceAll('"',""),i!=e.version?te(t,i,e):ne(e.name,e.version))}const te=(e,t,i)=>{D.show({title:"Update found",body:`A newer version is available for ${i.name}.
Would you like to install version ${t} now?`,confirmText:"Update",cancelText:"Not now",onConfirm:()=>oe(e,t,i)})},ne=(e,t)=>{console.log(`[${e}] is on the latest version (${t})`),w.open({content:`${e} is on the latest version (${t})`,source:c.Delete})};async function oe(e,t,i){window.enmity.plugins.installPlugin(pluginUrl,({data:r})=>{console.log(`${i.name} Update Error`,r),r=="installed-plugin"||r=="overriden-plugin"?D.show({title:`Updated ${i.name}`,body:`Successfully updated to version ${i.version}. 
Would you like to reload Discord now?`,confirmText:"Yep!",cancelText:"Later",onConfirm:()=>{Z()}}):D.show({title:"Error",body:`Something went wrong while updating ${i.name}.`,confirmText:"Report this issue",cancelText:"Cancel",onConfirm:()=>{D.close()},onCancel:()=>{Router.openURL(`https://github.com/spinfal/enmity-plugins/issues/new?assignees=&labels=bug&template=bug_report.md&title=%5BBUG%5D%20${i.name}%20Update%20Error`)}})})}const{components:o}=window.enmity;o.Alert,o.Button,o.FlatList;const ie=o.Image;o.ImageBackground,o.KeyboardAvoidingView,o.Modal,o.Pressable,o.RefreshControl;const ae=o.ScrollView;o.SectionList,o.StatusBar,o.StyleSheet,o.Switch;const f=o.Text;o.TextInput,o.TouchableHighlight;const S=o.TouchableOpacity;o.TouchableWithoutFeedback,o.Touchable;const E=o.View;o.VirtualizedList,o.Form,o.FormArrow,o.FormCTA,o.FormCTAButton,o.FormCardSection,o.FormCheckbox;const A=o.FormDivider;o.FormHint,o.FormIcon,o.FormInput,o.FormLabel,o.FormRadio;const a=o.FormRow,U=o.FormSection;o.FormSelect,o.FormSubLabel;const se=o.FormSwitch;o.FormTernaryCheckBox,o.FormText,o.FormTextColors,o.FormTextSizes;const $=window.enmity.modules.common.Components.General.Animated,[C,re]=P(_.byProps("transitionToGuild"),_.byProps("setString"));var le=({manifest:e})=>{const t=k.createThemedStyleSheet({container:{paddingTop:30,paddingLeft:20,marginBottom:-5,flexDirection:"row"},text_container:{paddingLeft:15,paddingTop:5,flexDirection:"column",flexWrap:"wrap"},image:{width:75,height:75,borderRadius:10},main_text:{opacity:.975,letterSpacing:.25},header:{color:p.ThemeColorMap.HEADER_PRIMARY,fontFamily:p.Fonts.DISPLAY_BOLD,fontSize:25,letterSpacing:.25},sub_header:{color:p.ThemeColorMap.HEADER_SECONDARY,opacity:.975,fontSize:12.75}}),i=n.useRef(new $.Value(1)).current,r=()=>{$.spring(i,{toValue:1.1,duration:250,useNativeDriver:!0}).start()},d=()=>{$.spring(i,{toValue:1,duration:250,useNativeDriver:!0}).start()},h=()=>{C.openURL("https://spin.rip/")},b={transform:[{scale:i}]};return n.createElement(n.Fragment,null,n.createElement(E,{style:t.container},n.createElement(S,{onPress:h,onPressIn:r,onPressOut:d},n.createElement($.View,{style:[b]},n.createElement(ie,{style:[t.image],source:{uri:"https://cdn.spin.rip/r/l9uevwe4ia0.jpg"}}))),n.createElement(E,{style:t.text_container},n.createElement(S,{onPress:()=>{C.openURL(e.sourceUrl)}},n.createElement(f,{style:[t.main_text,t.header]},e.name," ")),n.createElement(E,{style:{flexDirection:"row"}},n.createElement(f,{style:[t.main_text,t.sub_header]},"A plugin by"),n.createElement(S,{onPress:()=>{C.openURL("https://spin.rip/")}},n.createElement(f,{style:[t.main_text,t.sub_header,{paddingLeft:4,fontFamily:p.Fonts.DISPLAY_BOLD}]},e.authors[0].name))),n.createElement(E,{style:{flexDirection:"row"}},n.createElement(f,{style:[t.main_text,t.sub_header]},"Settings page by"),n.createElement(S,{onPress:()=>{C.openURL("https://github.com/acquitelol/")}},n.createElement(f,{style:[t.main_text,t.sub_header,{paddingLeft:4,fontFamily:p.Fonts.DISPLAY_BOLD}]},"Acquite <3"))),n.createElement(E,null,n.createElement(S,{style:{flexDirection:"row"},onPress:()=>{re.setString(`**${e.name}** v${e.version}`),N("plugin name and version")}},n.createElement(f,{style:[t.main_text,t.sub_header]},"Version:"),n.createElement(f,{style:[t.main_text,t.sub_header,{paddingLeft:4,fontFamily:p.Fonts.DISPLAY_BOLD}]},e.version," "))))))};const[me,ce]=P(_.byProps("transitionToGuild"),_.byProps("setString"));var de=({manifest:e,settings:t,hasToasts:i,section:r})=>{const d=k.createThemedStyleSheet({icon:{color:p.ThemeColorMap.INTERACTIVE_NORMAL},item:{color:p.ThemeColorMap.TEXT_MUTED}}),[h,b]=n.useState(),[u,g]=n.useState();return n.createElement(n.Fragment,null,n.createElement(ae,{onTouchStart:s=>{b(s.nativeEvent.pageX),g(s.nativeEvent.pageY)},onTouchEnd:s=>{h-s.nativeEvent.pageX<-100&&u-s.nativeEvent.pageY<40&&u-s.nativeEvent.pageY>-40&&O.pop()}},n.createElement(le,{manifest:e}),r,n.createElement(U,{title:"Utility"},i&&n.createElement(n.Fragment,null,n.createElement(a,{label:"Initialization Toasts",leading:n.createElement(a.Icon,{style:d.icon,source:c.Settings.Toasts.Context}),subLabel:`If available, show toasts when ${e.name} is starting`,trailing:n.createElement(se,{value:t.getBoolean(`${e.name}-toastEnable`,!1),onValueChange:()=>{t.toggle(`${e.name}-toastEnable`,!1),w.open({content:`Successfully ${t.getBoolean(`${e.name}-toastEnable`,!1)?"enabled":"disabled"} Initialization Toasts.`,source:c.Settings.Toasts.Settings})}})}),n.createElement(A,null)),n.createElement(a,{label:"Copy Debug Info",subLabel:`Copy useful debug information of ${e.name} to clipboard.`,leading:n.createElement(a.Icon,{style:d.icon,source:c.Settings.Debug}),trailing:a.Arrow,onPress:async function(){ce.setString(await Q(e.name,e.version)),N("plugin debug information")}}),n.createElement(A,null),n.createElement(a,{label:"Clear Device List Cache",subLabel:"Remove the fetched device list storage. This will not clear Discord's or your iDevice's cache.",leading:n.createElement(a.Icon,{style:d.icon,source:c.Delete}),trailing:a.Arrow,onPress:async function(){await T.removeItem("device_list"),w.open({content:"Cleared device list storage.",source:c.Settings.Toasts.Settings})}})),n.createElement(U,{title:"Source"},n.createElement(a,{label:"Check for Updates",subLabel:`Check for any plugin updates for ${e.name}.`,leading:n.createElement(a.Icon,{style:d.icon,source:c.Copy}),trailing:a.Arrow,onPress:()=>{ee({manifest:e})}}),n.createElement(A,null),n.createElement(a,{label:"Source",subLabel:`View ${e.name} source code`,leading:n.createElement(a.Icon,{style:d.icon,source:c.Open}),trailing:a.Arrow,onPress:()=>{me.openURL(`https://github.com/spinfal/enmity-plugins/tree/master/${e.name}`)}})),n.createElement(a,{label:`Plugin Version: ${e.version}`})))};const F=H("HideBlockedMessages"),x=I("_currentDispatchActionType","_subscriptions","_waitQueue"),L=I("isBlocked","isFriend"),ue={...l,onStart(){let e=0,t=3;const i=()=>{let r=q(l.name,`${l.name}-toastEnable`,!1);try{e++,console.log(`${l.name} delayed start attempt ${e}/${t}.`),r&&w.open({content:`${l.name} start attempt ${e}/${t}.`,source:c.Debug});const d=x._actionHandlers._orderedActionHandlers.LOAD_MESSAGES_SUCCESS.find(u=>u.name==="MessageStore"),h=x._actionHandlers._orderedActionHandlers.MESSAGE_CREATE.find(u=>u.name==="MessageStore"),b=x._actionHandlers._orderedActionHandlers.MESSAGE_UPDATE.find(u=>u.name==="MessageStore");F.before(h,"actionHandler",(u,g)=>{var s;const y=g[0].message;g[0].message=L.isBlocked((s=y==null?void 0:y.author)==null?void 0:s.id)?null:y}),F.before(b,"actionHandler",(u,g)=>{var s;const y=g[0].message;g[0].message=L.isBlocked((s=y==null?void 0:y.author)==null?void 0:s.id)?null:y}),F.before(d,"actionHandler",(u,g)=>{g[0].messages=g[0].messages.filter(s=>!L.isBlocked(s.author.id))}),console.log(`${l.name} delayed start successful.`),r&&w.open({content:`${l.name} start successful.`,source:c.Delete})}catch(d){console.log(`[${l.name} Error]`,d),e<t?(console.warn(`${l.name} failed to start. Trying again in ${e}0s.`),r&&w.open({content:`${l.name} failed to start trying again in ${e}0s.`,source:c.Failed}),setTimeout(i,e*1e4)):(console.error(`${l.name} failed to start. Giving up.`),w.open({content:`${l.name} failed to start. Giving up.`,source:c.Failed}))}};setTimeout(i,300)},onStop(){F.unpatchAll()},patches:[],getSettingsPanel({settings:e}){return n.createElement(de,{manifest:l,settings:e,hasToasts:!0,section:[]})}};V(ue);
