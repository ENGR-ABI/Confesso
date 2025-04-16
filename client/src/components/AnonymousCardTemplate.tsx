import React from 'react';
import { Stage, Layer } from 'react-konva';
import GifImage from './GifImage';

interface AnonymousCardTemplateProps {
  anonymousMessage: {
    question?: string;
    title?: string;
    answer?: string;
    respond?: string;
  };
  isReply?: boolean;
}

export default function AnonymousCardTemplate({ anonymousMessage, isReply = true }: AnonymousCardTemplateProps) {
  return (
    <div
      id="captureDiv"
      style={{
        backgroundColor: "#26065d",
        position: "relative",
        alignContent: "center",
        width: "440px",
        height: isReply ? "956px" : "700px",
        padding: "0px 20px",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          background: `linear-gradient(154deg, rgba(51, 50, 247, 1) 0%, rgba(236, 19, 116, 1) 100%)`,
          borderRadius: "40px",
          boxShadow: "6px 6px 10px #00000040",
          padding: "2px",
          marginBottom: "80px",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            borderRadius: "40px",
          }}
        >
          {/* Top Gradient Section */}
          <div
            style={{
              padding: "40px 30px",
              position: "relative",
              borderRadius: "40px 40px 0px 0px",
              background: `linear-gradient(154deg, rgba(51, 50, 247, 1) 0%, rgba(236, 19, 116, 1) 100%)`,
            }}
          >
            <div
              style={{
                position: "relative",
                marginTop: "-1px",
                textShadow: "0px 0px 10px #fe0d8c",
                fontFamily: "'Inter-Bold', Helvetica, sans-serif",
                fontWeight: 700,
                color: "#ffffff",
                fontSize: "22px",
                textAlign: "center",
                letterSpacing: 0,
                lineHeight: "normal",
              }}
            >
              {
                isReply ? anonymousMessage.question : anonymousMessage.title
              }
            </div>
          </div>

          {/* question or chats Section */}
          <div
            style={{
              padding: "26px 19px",
              backgroundColor: "#2f0970",
              borderRadius: "0px 0px 40px 40px",
            }}
          >
            <div
              style={{
                position: "relative",
                fontFamily: "'Inter-Bold', Helvetica, sans-serif",
                fontWeight: "normal",
                color: "#ffffff",
                fontSize: "18px",
                textAlign: "center",
                letterSpacing: 0,
                lineHeight: "normal",
                margin: 0, // Added to prevent default <p> margins
              }}
            >
              {
                isReply ? (
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexDirection: "column",
                    gap: 30,
                  }}>

                    {/* Answer chat */}
                    <div style={{
                      display: "flex",
                      alignItems: "end",
                      justifyContent: "space-between",
                      flexDirection: "row",
                      gap: "10px"
                    }}>
                      <div style={{
                        background: `linear-gradient(154deg, rgba(51, 50, 247, 1) 0%, rgba(236, 19, 116, 1) 100%)`,
                        padding: "2px",
                        borderRadius: 100,
                      }}>
                        <img
                          src="/anonym.png"
                          alt="Ellipse"
                          width={104}
                          height={104}
                          style={{
                            objectFit: "cover",
                            borderRadius: 100,
                          }}
                        />
                      </div>
                      <div
                        style={{
                          backgroundImage: "url(/chat-bubble-left.png)",
                          backgroundSize: '100% 100%',
                          textAlign: 'left',
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'center',
                          padding: "12px 10px 12px 30px",
                        }}
                      >
                        {
                          anonymousMessage.respond
                        }
                      </div>
                    </div>

                      {/* Response chat */}
                    <div style={{
                      display: "flex",
                      alignItems: "end",
                      justifyContent: "space-between",
                      flexDirection: "row",
                      gap: "10px"
                    }}>
                      <div
                        style={{
                          backgroundImage: "url(/chat-bubble-right.png)",
                          backgroundSize: '100% 100%',
                          textAlign: 'left',
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'center',
                          padding: "12px 10px 12px 30px",
                        }}
                      >
                        {
                          anonymousMessage.answer
                        }
                      </div>
                      <div style={{
                        background: `linear-gradient(154deg, rgba(51, 50, 247, 1) 0%, rgba(236, 19, 116, 1) 100%)`,
                        padding: "2px",
                        borderRadius: 100,
                      }}>
                        <img
                          src="/me-compressed.png"
                          alt="Ellipse"
                          width={104}
                          height={104}
                          style={{
                            objectFit: "cover",
                            borderRadius: 100,
                            transform: 'rotateX(10deg)'
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ) :
                  anonymousMessage.answer
              }
            </div>
          </div>

          {/* Ellipse Image */}
          {!isReply && (
            <div style={{
              background: `linear-gradient(154deg, rgba(51, 50, 247, 1) 0%, rgba(236, 19, 116, 1) 100%)`,
              padding: "4px",
              position: "absolute",
              top: "-40px",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 10,
              borderRadius: 100
            }}>
              <img
                src="/me-compressed.png"
                alt="Ellipse"
                width={64}
                height={64}
                style={{
                  objectFit: "cover",
                  borderRadius: 100,
                }}
              />
            </div>
          )}

          {/* Bottom Arrow */}
          <Stage
            width={60}
            height={200}
            style={{
              position: "absolute",
              bottom: "-200px",
              left: "50%",
              transform: "translateX(-50%)",
              objectFit: "fill",
            }}
          >
            <Layer>
              <GifImage />
            </Layer>
          </Stage>

        </div>
      </div>
    </div>
  );
}